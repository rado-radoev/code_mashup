require('dotenv').config();
var socketio = require('socket.io');
var io = socketio();
var socket_api = {};
var request = require('request');

socket_api.io = io;

// Globals
var outside_temp = 0;
var inside_temp = 0;
var outside_humidity = 0;
var inside_humidity = 0;

let baseApi = 'http://api.openweathermap.org/data/2.5/weather?';

io.on('connection', (socket) => {
    socket.emit('connected', {connected: true});

    socket.on('currentLocation', (location) => {
        let lat = location.location.latitude;
        let lon = location.location.longitude;
        let loc = `lat=${lat}&lon=${lon}`;
        let appid= `appid=${process.env.WEATHER_API}`;
        let params = `units=metric`
        let url = baseApi + loc + "&" + appid + "&" + params;

        let options = {
            method: 'get',
            json: true,
            url
        }

        request(options, (error, res, body) => {
            if (error) {
                console.error('Error getting weather data');
            }

            socket.emit('outside_weather', body);
        });
    });
})

module.exports = {
    socket_api,
    outside_humidity,
    outside_temp,
    inside_humidity,
    inside_temp
}