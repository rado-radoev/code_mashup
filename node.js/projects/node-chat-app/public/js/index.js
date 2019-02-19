var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('reconnect', function (attemptNumber) {
  console.log('Reconnected');
});

socket.on('newMessage', function (message) {
  console.log('New message', message);
});

socket.emit('createMessage', {
  from: 'Frank',
  text: 'Hi'
}, function (data = 'Got it') {
  console.log(data);
});
