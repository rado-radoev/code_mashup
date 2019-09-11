module.exports = function(io) {
  var express = require('express');
  var router = express.Router();
  // var Gpio = require('onoff').Gpio;

  // const led = new Gpio(5, 'out');

  var armed = false;

  io.on('connection', (socket) => {
    socket.emit('connected', {
      payload: 'Hello from server. You are connected'
    });

    socket.on('getSystemStatus', (callback) => {
      callback(armed);
    });

    socket.on('btnPressed', (btnPressed) => {
      console.log('Button pressed - ' + btnPressed);
      if (btnPressed === 'btn-on') {
        armed = true;
      } else {
        armed = false;
      }

      socket.emit('newSystemStatus', armed);
    });
  });

  /* GET home page. */
  router.get('/', function(req, res, next) {
    var secSystemStatus = (armed ? "Armed": "Disarmed");
    res.render('index', { 
      title: 'Welcome to VR Security',
      subtitle: secSystemStatus
    });
  });
  
  process.on('SIGINT', () => {
    //led.unexport();
  });

  return router;
};




