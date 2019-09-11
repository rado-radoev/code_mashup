module.exports = function(io) {
  var express = require('express');
  var router = express.Router();
  var Gpio = require('onoff').Gpio;

  const led = new Gpio(5, 'out');


  io.on('connection', (socket) => {
    socket.emit('connected', {payload: 'Hello from server. You are connected'});

  });

  /* GET home page. */
  router.get('/', function(req, res, next) {
    var secSystemStatus = 'Disarmed';
    res.render('index', { 
      title: 'Welcome to VR Security',
      subtitle: `Security System is current ${secSystemStatus}`
    });
  });
  
  process.on('SIGINT', () => {
    led.unexport();
  });

  return router;
}




