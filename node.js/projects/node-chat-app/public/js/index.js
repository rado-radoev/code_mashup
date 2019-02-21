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
  var formattedTime = moment(message.createdAt).format('h:mm a');
  console.log('New message', message);

  var li = jQuery('<li></li>');
  li.text(`${message.from} ${formattedTime}: ${message.text}`);

  jQuery('#messages').append(li);
});
//
// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'Hi'
// }, function (data = 'Got it') {
//   console.log(data);
// });

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextBox = jQuery('[name=message]');

  if (messageTextBox.val()) {
    socket.emit('createMessage', {
      from: 'User',
      text: messageTextBox.val()
    }, function () {
      messageTextBox.val('');
    });
  }

  messageTextBox.focus();
});

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank" >My current location</a>');

  li.text(`${message.from} ${formattedTime}: `);
  a.attr('href', message.url);

  li.append(a);
  jQuery('#messages').append(li);
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location');

  let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }

  function success(position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }

  function error () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  }

  navigator.geolocation.getCurrentPosition(success, error, options);
  jQuery('[name=message]').focus();
})
