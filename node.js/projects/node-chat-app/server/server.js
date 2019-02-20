const path = require('path');
const hbs = require('hbs');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
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

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user jointed'));

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);

    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server');
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
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
