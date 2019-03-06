const socket = io();

// Elements
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationButton = document.getElementById('send-location');
const $messages = document.getElementById('messages');

//Templates
const messageTemplate = document.getElementById('message-template').innerHTML;
const locationTemplate = document.getElementById('location-template').innerHTML;

// Misc
const timeFormat = 'h:mm a'

// Options
var { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

socket.on('message', (message) => {
    console.log(message);
    const html = Mustache.render(messageTemplate, {
        'message': message.text,
        'createdAt': moment(message.createdAt).format(timeFormat)
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

socket.on('locationMessage', (locationURL) => {
    console.log(locationURL)
    const html = Mustache.render(locationTemplate, {
        'mapLink': locationURL.text,
        'locationText': 'My current location',
        'createdAt' : moment(locationURL.createdAt).format(timeFormat)
    });

    $messages.insertAdjacentHTML('beforeend', html);
});

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault( )

    // disable
    $messageFormButton.setAttribute('disabled', 'disabled');

    // let inputMessage = document.getElementsByName('message')[0].value;
    let inputMessage = e.target.elements.message.value;

    socket.emit('sendMessage', inputMessage, (callbackMessage) => {
        $messageFormButton.removeAttribute('disabled');
        $messageFormInput.value = ''
        $messageFormInput.focus()

        if (callbackMessage) {
            return console.log(callbackMessage)
        }

        console.log('Message delivered')

    });


})

$sendLocationButton.addEventListener('click', () => {

    if (!navigator.geolocation) {
        return alert('Geolocaiton is not supported by your browser');
    }

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 6000
      };

    function success(pos) {
        var crd = pos.coords;

        socket.emit('sendLocation', {
            'latitude': crd.latitude,
            'longitude': crd.longitude
        }, () => {
            $sendLocationButton.removeAttribute('disabled');
            console.log('Location received')
        });
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    $sendLocationButton.setAttribute('disabled', 'disabled');
    navigator.geolocation.getCurrentPosition(success, error, options);
});


socket.emit('join', { username, room }, (error) => {
  if (error) {
    alert(error)
    location.href = '/'
  }
})
