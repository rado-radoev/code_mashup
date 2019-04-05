const helmet = require('helmet')
const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const hbs = require('hbs')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = 3000;

const viewPath = path.join(__dirname, './core/views')
const partialsPath = path.join(__dirname, './core/views/partials')

app.use(helmet())
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.get('/', (req, res) => {
    res.render('index', {
        'document-title': 'Wather App',
        'greeting': 'Welcome!'
    })
})

io.on('connection', (socket) => {
    console.log('New websocket connection')

    socket.on('weather_data', (weather_data) => {
        console.log('in socket.on weather_data')
        console.log(weather_data)
        json_data = JSON.parse(weather_data)
        console.log(json_data['_id'])
        console.log(json_data['city']['city'])
        console.log(json_data['weather']['main']['temp'])
    })
})

server.listen(port, () => {
    console.log('Server is running on port', port)
})