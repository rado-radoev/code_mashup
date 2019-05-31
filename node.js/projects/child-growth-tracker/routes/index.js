var express = require('express');
var router = express.Router();

// var mongoose = require('../src/db/mongoose')
const Child = require('../playground/models/child')
const Height = require('../playground/models/height')
const Weight = require('../playground/models/weight')

Date.prototype.toShortFormat = function() {

  var month_names =["Jan","Feb","Mar",
                    "Apr","May","Jun",
                    "Jul","Aug","Sep",
                    "Oct","Nov","Dec"];
  
  var day = this.getDate();
  var month_index = this.getMonth();
  var year = this.getFullYear();
  
  return "" + day + "-" + month_names[month_index] + "-" + year;
}

async function childExists(childName) {
  var child = await Child.findOne({name: childName});
  return child;
}

router.use(function(req, res, next) {

  var io = req.app.get('socketio')
  

  // Check if child exists
  child = childExists('Victor')
  child.then((result) => {
    let name = result.name
    io.on('connection', (socket) => {
      socket.join(name, () => {
        io.to(name).emit('childName', name)
      })
    })
  }).catch((e) => {
    console.log(e)
  })
  
  
  // If child exists send socket io to client
  // hide the name and birthdate form and
  // display the add child button


  next()
})



/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { 
    title: 'Baby Monitor',
    subTitle: `Monitoring ${req.cn}`,
    currDate: (new Date()).toShortFormat()
  });
});

module.exports = router;
