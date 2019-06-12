var express = require('express');
var router = express.Router();
var { addChildToDb, addChildDataToDB, getAllHeights, getAllWeights, getAllChildren, childExists } = require('../src/db/db_control')
var { calcAge, convertDaysToMonths, convertDaysToYears } = require('../src/util/utils')

// var mongoose = require('../src/db/mongoose')
const Child = require('../src/models/child')
const Height = require('../src/models/height')
const Weight = require('../src/models/weight')

Date.prototype.toShortFormat = function() {

  var month_names =["Jan","Feb","Mar",
                    "Apr","May","Jun",
                    "Jul","Aug","Sep",
                    "Oct","Nov","Dec"];
  
  var day = this.getDate();
  var month_index = this.getMonth();
  var year = this.getFullYear();
  
  return "" + (month_index + 1) + "/" + day + "/" + year;  
  // return "" + day + "/" + month_names[month_index] + "/" + year;
}

router.use(async function(req, res, next) {

  var io = req.app.get('socketio')

  let c = await getAllChildren()
  let c_name = c[0].name
  req.child = c_name
  
  // Check if child exists
  var child = childExists(c_name)
  child.then((result) => {
    let name = result.name
    let id = result._id
    // console.log(id)
    
    io.on('connection', (socket) => {
      socket.join(name, () => {
        io.to(name).emit('childName', name)
      })

      socket.on('new-child', async (childData) => {
        var added = await addChildToDb(childData);
        if (added) {
          socket.emit('child-added-to-db-notify', (added.name))
        }
      })

      socket.on('height-weight', async (size) => {
        var added = await addChildDataToDB(size, id)
        if (added) {
          socket.emit('child-data-added-to-db-notify',(name))
        }
      })

      socket.on('request_height', async () => {
        var heights = await getAllHeights(id)
        socket.emit('update_height', heights)
      })

      socket.on('request_weight', async () => {
        var weights = await getAllWeights(id)
        socket.emit('update_weight', weights)
      })

      socket.on('newDefaultChildName', (newChildName) => {
        socket.emit('newChildSelected', (newChildName))
        // res.locals.child = undefined
        req.child = newChildName
       })

    })
  }).catch((e) => {
    console.log(e)
  })

  next()
})

/* GET home page. */
router.get('/', async function(req, res, next) {

  console.log(req.child)
  var name = await childExists(req.child)
  var id = name._id
  let ageTemp = calcAge(name.birthdate)
  var age = ageTemp > 365 ? convertDaysToYears(ageTemp) : convertDaysToMonths(ageTemp)
  let age_t = ['months', 'year(s)']
  var age_type = ageTemp > 365 ? age_t[1] : age_t[0]

  var g = await getAllChildren()
  // console.log(g)

  res.render('index', { 
    object: g,
    title: 'Baby Monitor',
    DefaultChildName: name.name,
    childName: name.name,
    childBirthDate: (name.birthdate).toShortFormat(),
    childAge: `${age} ${age_type} old.`,
    currDate: (new Date()).toShortFormat()
  });
});

module.exports = router;
