module.exports = function(io) {
  var express = require('express');
  var router = express.Router();

  io.on('connection', (socket) => {

    socket.on('getledstatus', (status) => {
      socket.emit('ledstatus', status++);
    });

    console.log('Connected client');
    socket.emit('connected', {
        connected: 'Yay!'
    });

    socket.on('testmessage', function (data, callback) {
      console.log('Socket (server-side): received message:', data);
      var responseData = {
          string1: 'I like ',
          string2: 'bananas ',
          string3: ' dude!'
      };
      //console.log('connection data:', evData);
      callback(responseData);
    });
  });

  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
    
    io.on('connection', (socket) => {
      socket.emit('getter');
    })
  });

  router.post('/', function(req, res, next) {
    io.on('connection', (socket) => {
      socket.emit('post', req.body);
    });
    res.render('index', { title: 'Express' });
  });


  return router;
}


