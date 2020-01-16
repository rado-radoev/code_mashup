const request = require('request');

const forecast = (location, callback) => {
    const url = `https://api.darksky.net/forecast/727aa84fdc5b7b6b96a4b85d792ae533/${location.longitude},${location.latitude}?units=si&lang=bg`

    request({
        url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to DarkSky weather service')
        } else if (response.body.error) {
            callback('Unable to find location')
        } else {
            const temp = response.body.currently.temperature
            const chanceOfRain = response.body.currently.precipIntensity
            callback(undefined, ` ${response.body.daily.data[0].summary} It is currently ${temp} degrees out. There is ${chanceOfRain} chance of rain.`)
        }
    } )
}

module.exports = forecast;