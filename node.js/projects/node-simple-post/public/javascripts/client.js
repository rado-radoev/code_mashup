var socket = io();

socket.on('connected', (data) => {
    console.log('connected');
});

socket.on('newtemp', (data) => {
    $('#temp-data li').remove();
    $('#temp-data').append(`<li>Outside Temp: ${data.outside_temp}</li>`);
    $('#temp-data').append(`<li>Outside Humidity: ${data.outside_humidity}</li>`);
    $('#temp-data').append(`<li>Inside Temp: ${data.inside_temp}</li>`);
    $('#temp-data').append(`<li>Inside Humidity: ${data.inside_humidity}</li>`);
});

socket.on('outside_weather', (weather) => {
    $('#temp-data li')[0].innerText = `Outside Temp: ${weather.main.temp}`;
    $('#temp-data li')[1].innerText = `Outside Humidity: ${weather.main.humidity}`;
    $('#weather-icon').attr("src",`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    $("#weather-description")[0].childNodes[2].textContent = weather.weather[0].description;
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(sendPosition);
    } else {
        alert('Geolocation is not supported');
    }
}

function sendPosition(position) {
    socket.emit('currentLocation', {
        location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }
    });
}

$( document ).ready(function() {
    getLocation();
});
