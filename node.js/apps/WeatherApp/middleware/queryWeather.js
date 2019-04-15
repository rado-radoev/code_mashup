const socketio = require('socket.io')

function queryWeather (req, res, next) {

    console.log('In queryweather data')
    socket.on('weather_data', (weather_data) => {
        console.log('in socket.on weather_data')
        console.log(weather_data)
        json_data = JSON.parse(weather_data)
        weatherData = json_data
    });

    next()
}

module.exports = queryWeather