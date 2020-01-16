const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/727aa84fdc5b7b6b96a4b85d792ae533/${longitude},${latitude}?units=si&lang=bg`

    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to DarkSky weather service')
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            const temp = body.currently.temperature
            const chanceOfRain = body.currently.precipIntensity
            callback(undefined, ` ${body.daily.data[0].summary} It is currently ${temp} degrees out. There is ${chanceOfRain} chance of rain.`)
        }
    } )
}

module.exports = forecast;