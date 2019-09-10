var express = require('express');
var router = express.Router();
var getLatestData = require('../utils/weatherData');
// var request = require('request')

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   var url = 'http://localhost:3000/temperatures/temp/latest'
//   var data
//   request({url, json: true}, (error, response) => {
//     data = response.body[0];
//     console.log(data)
//   });
//   console.log(data)
//   res.render('index', { 
//     title: 'RaspbianTemp',
//     temp: data.temp,
//     humidity: data.humidity
//    });
// });

// Get homepage
router.get('/', (req, res) => {

  var url = 'http://localhost:3000/temperatures/temp/latest'
  getLatestData(url, (error, data) => {
    if (!error) {
      res.render('index', {
        title: "Raspbian",
        temp: data.temp,
        humidity: data.humidity
      })
    } else {
      res.send(error);
    }
  }); 
});


module.exports = router;
