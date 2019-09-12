module.exports = function(io) {
  var express = require('express');
  var router = express.Router();
  require('../scripts/pirControl')

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
        // execute functions to turn pir, magent and light on
      } else {
        armed = false;
        // execute functions to turn pir, magent and light off
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




