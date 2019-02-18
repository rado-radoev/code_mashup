var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

  // socket.emit('createEmail', {
  //   to: 'jen@example.com',
  //   text: 'Hey this is Rado'
  // });

  socket.emit('createMessage', {
    from: 'lame@example.com',
    text: 'i am stupid'
  });

});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('reconnect', function (attemptNumber) {
  console.log('Reconnected');
});

// socket.on('newEmail', function (email) {
//   console.log('New email', email);
// });

socket.on('newMessage', function (message) {
  console.log('New message', message);
});
