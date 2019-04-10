const helmet = require('helmet')
const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const hbs = require('hbs')
const moment = require('moment')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = 3000;

const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(path.join(__dirname, '../public')))

app.use(helmet())
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

weatherData = ''

// app.use((req, res, next) => {
//     io.on('connection', (socket) => {
//         console.log('New websocket connection')
    
//         // on io.on execute a method to query 
//         // weather data from python
//         // python will return the data 
//         // and then we will execute the socket.osn('weather_data')
    
//         socket.on('weather_data', (weather_data) => {
//             console.log('in socket.on weather_data')
//             console.log(weather_data)
//             json_data = JSON.parse(weather_data)
//             weatherData = json_data
//         })
//     })

//     next();
// })

app.get('/', (req, res) => {

    io.on('connection', (socket) => {
        console.log('New websocket connection')

        socket.emit('update_weather', city='San Diego')
    
        // on io.on execute a method to query 
        // weather data from python
        // python will return the data 
        // and then we will execute the socket.osn('weather_data')
    
        socket.on('weather_data', (weather_data) => {
            console.log('in socket.on weather_data')
            console.log(weather_data)
            json_data = JSON.parse(weather_data)
            weatherData = json_data
        })


        
    })

    console.log(weatherData)
    res.render('index', {
        'Temp': weatherData['weather']['main']['temp'],
        'Humidity': weatherData['weather']['main']['humidity'],
        'Min_Temp': weatherData['weather']['main']['temp_min'],
        'Pressure': weatherData['weather']['main']['pressure'],
        'Max_Temp': weatherData['weather']['main']['temp_max'],
        'Wind_Speed': weatherData['wind']['speed'],
        'City_Name': weatherData['city']['city'],
        'WeatherDescription': weatherData['weather']['weather']['description']
    })
})

io.on('connection', (socket) => {
    console.log('New websocket connection')

    // on io.on execute a method to query 
    // weather data from python
    // python will return the data 
    // and then we will execute the socket.osn('weather_data')

    // socket.on('weather_data', (weather_data) => {
    //     console.log('in socket.on weather_data')
    //     console.log(weather_data)
    //     json_data = JSON.parse(weather_data)
    //     weatherData = json_data
    // })
})

server.listen(port, () => {
    console.log('Server is running on port', port)
})