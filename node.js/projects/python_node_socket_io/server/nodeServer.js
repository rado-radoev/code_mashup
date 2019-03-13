const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const hbs = require('hbs')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = 3000

// if you want to server static HTML files
// Set static directory to server
// const publicDirectoryPath = path.join(__dirname, '../public')
// app.use(express.static(publicDirectoryPath))

const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

const latlon = { 'lat': 0, 'lon': 55 }

app.get('/', (req, res) => {
  res.render('index', {
      'title': 'Weather',
      'username': 'superlamer',
      'lat': latlon.lat,
      'lon': latlon.lon
      
  })
})

io.on('connection', (socket) => {
  console.log('New websocket connection')

  socket.emit('my message', 'This is message from the future!')

  socket.on('weather_message', (weatheData) => {
    console.log('in weather_message')
    console.log(weatheData.Lon)
    latlon.lon = weatheData.Lon
    latlon.lat = weatheData.Lat
  })
})

server.listen(port, () => {
  console.log('Server is up and running on port ', port)
})
