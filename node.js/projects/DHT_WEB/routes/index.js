var express = require('express');
var router = express.Router();
var request = require('request')

/* GET home page. */
router.get('/', function(req, res, next) {
  var url = 'http://localhost:3000/temperatures'
  request({url}, (error, response) => {
    console.log(response.statusCode);
  })
  res.render('index', { 
    title: 'Express',
    temp: 11.45,
    humidity: 44.6
   });
});

module.exports = router;
