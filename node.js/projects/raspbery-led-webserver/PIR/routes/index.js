


module.exports = function(io) {
  var express = require('express');
  var router = express.Router();
  var Gpio = require('onoff').Gpio;

  const led = new Gpio(5, 'out');


  io.on('connection', (socket) => {
    socket.on('ledclicked', () => {
      if (led.readSync() === 1) {
        led.writeSync(0);
      } else {
        led.writeSync(1);
      }

      socket.emit('ledstatus', led.readSync());
    });

  });

  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });
  
  process.on('SIGINT', () => {
    led.unexport();
  });

  return router;
}




