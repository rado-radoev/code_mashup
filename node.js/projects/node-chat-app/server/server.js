const path = require('path');
const hbs = require('hbs');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
var publicPath = path.join(__dirname, '/../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

hbs.registerPartials(path.join(__dirname, './../views/partials'));
app.set('view engine', 'hbs');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New User connected');

  socket.on('createMessage', (message) => {
    //console.log('createMessage', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });


  socket.on('disconnect', (reason) => {
    if (reason === 'server namespace disconnect') {
      console.log('Server closed connection');
    }
    else if (reason === 'client namespace disconnect') {
      console.log('Client closed connection');
    }
    else {
      console.log('Connection just closed');
    }
  });
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
