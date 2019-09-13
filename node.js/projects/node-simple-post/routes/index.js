var express = require('express');
var router = express.Router();
var { outside_temp, outside_humidity, inside_temp, inside_humidity } = require('../sockets/socket_api');
var socket_api = require('../sockets/socket_api').socket_api;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Weather What',
    outside_temp,
    outside_humidity,
    inside_temp,
    inside_humidity
  });
});

router.post('/newweather', function(req, res, next) {
  outside_temp = req.body.outside_temp;
  outside_humidity = req.body.outside_humidity;
  inside_humidity = req.body.inside_humidity;
  inside_temp = req.body.inside_temp;

  socket_api.io.emit('newtemp', t = {outside_humidity, outside_temp, inside_humidity, inside_temp});

  res.redirect('/');
});

module.exports = router;
