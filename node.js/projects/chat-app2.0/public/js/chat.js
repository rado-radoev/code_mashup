const socket = io();

socket.on('message', (message) => {
    console.log(message);
})

document.getElementById('message-form').addEventListener('submit', (e) => {
    e.preventDefault( )
    // let inputMessage = document.getElementsByName('message')[0].value;
    let inputMessage = e.target.elements.message.value;
    socket.emit('sendMessage', inputMessage);
})

document.getElementById('send-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocaiton is not supported by your browser');
    }

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

    function success(pos) {
        var crd = pos.coords;
        // console.log('Your current position is:');
        // console.log(`Latitude : ${crd.latitude}`);
        // console.log(`Longitude: ${crd.longitude}`);
        // console.log(`More or less ${crd.accuracy} meters.`);

        socket.emit('sendLocation', {
            'latitude': crd.latitude,
            'longitude': crd.longitude
        });
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }


    navigator.geolocation.getCurrentPosition(success, error, options);

});

// socket.on('countUpdated', (count) => {
//     console.log('The count has been updated', count);
// });

// document.querySelector('#increment').addEventListener('click', () => {
//     console.log('Clicked')
//     socket.emit('increment')
// });