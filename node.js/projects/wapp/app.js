const request = require('request');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(process.argv)

const address = process.argv[2]

if (!address) {
    console.log('Address is not provided')
}
else
{
    geocode(address, (error, data) => {

        if (error) {
            return console.log(error)
        }
    
        forecast(data, (error, forecastData) => {
    
            if (error) {
                return console.log(error)
            }
    
            console.log(data.location)
            console.log(forecastData)
        })
    })
}