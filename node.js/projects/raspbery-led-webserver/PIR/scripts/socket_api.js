var socketio = require('socket.io');
var io = socketio();
var socket_api = {};
var pir = require('../scripts/pirControl');

socket_api.io = io;

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
        pir.pirWatch();
      } else {
        armed = false;
        // execute functions to turn pir, magent and light off
        pir.unwatch();
      }

      io.emit('newSystemStatus', armed);
    });
  });

  module.exports = {
      socket_api,
      armed
  }