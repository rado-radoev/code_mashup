/*jshint esversion: 8 */ 

var express = require('express');
var router = express.Router();
var { addChildToDb, addChildDataToDB, getAllHeights, 
      getAllWeights, getAllChildren, childExists,
      getFirstChild, findChildByName } = require('../src/db/db_control');
var { calcAge, convertDaysToMonths, convertDaysToYears, toShortFormat } = require('../src/util/utils');


var c_name = async function (req, res, next) {
  let c = await getAllChildren();
  let c_name = c[0].name;
  req.child = c_name;

  next();
};

var test = function (options) {
  return function (req, res, next) {
    console.log(options)
    next();
  };
};

router.use(c_name);
// router.use(test({opt1: '1', opt2: '2'}))

router.use(async (req, res, next) => {


  var io = req.app.get('socketio');
  // Check if child exists
  var child = childExists(req.child);

  child.then((result) => {
    let name = result.name;
    let id = result._id; 

/*
may be play around with socket io rooms
leave a room when you change the name 
and join new room ?

See if you can move some of the middleware and the router
funcitons to outside funcitons

move router methods to middleware and pass them as parameters.

*/

    io.once('connection', (socket) => {
      socket.join(name, () => {
        io.to(name).emit('childName', name);
      });

      socket.on('request_child_object', async (child) => {
        if (!child) {
          first_child = await getFirstChild();
        }
        socket.emit('requsted_child_name', (first_child))
      })

      socket.on('new-child', async (childData) => {
        var added = await addChildToDb(childData);
        if (added) {
          socket.emit('child-added-to-db-notify', (added.name));
        }
      });

      socket.on('height-weight', async (size) => {
        var added = await addChildDataToDB(size, id);
        if (added) {
          socket.emit('child-data-added-to-db-notify',(name));
        }
      });

      socket.on('request_height', async (childId) => {
        if (!childId) {
          let c = await getFirstChild();
          childId = c._id
        }
        var heights = await getAllHeights(childId);
        socket.emit('update_height', heights);
      });

      socket.on('request_weight', async (childId) => {
        if (!childId) {
          let c = await getFirstChild();
          childId = c._id
        }
        var weights = await getAllWeights(childId);
        socket.emit('update_weight', weights);
      });

      socket.on('newDefaultChildName', async (newChildName) => {
        console.log(newChildName)
        let child = await findChildByName(newChildName)
        socket.emit('newChildSelected', (child));
        socket.emit('requsted_child_name', (child))
        let tempC = {
          name: child.name,
          birthDate: toShortFormat(child.birthdate),
          age: calcAge(child.birthdate)
        }
        // TO DO 


        // UPDATE THE CHILD NAME AND DB ON THE WEBSITE WHEN 
        // SELECTED FROM THE DROPDOWN

        // res.locals.child = undefined
        // req.child = newChildName
      });

    });
  }).catch((e) => {
    console.log(e);
  });

  next();
});

router.get('/name/:id', async (req, res, next) => {
  res.send(req.params.id)
})

router.get('/users/:userId/books/:bookId', function (req, res) {
  res.send(req.params)
})

/* GET home page. */
router.get('/', async function(req, res, next) {

  // console.log(req.child);
  var name = await childExists(req.child);
  var id = name._id;
  let ageTemp = calcAge(name.birthdate);
  var age = ageTemp > 365 ? convertDaysToYears(ageTemp) : convertDaysToMonths(ageTemp);
  let age_t = ['months', 'year(s)'];
  var age_type = ageTemp > 365 ? age_t[1] : age_t[0];

  var g = await getAllChildren();
  // console.log(g)

  res.render('index', { 
    object: g,
    title: 'Baby Monitor',
    DefaultChildName: name.name,
    childName: name.name,
    childBirthDate: toShortFormat(name.birthdate),
    childAge: `${age} ${age_type} old.`,
    currDate: toShortFormat(new Date())
  });
});

module.exports = router;
