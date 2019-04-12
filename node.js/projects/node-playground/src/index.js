// const path = require('path')
// const hbs = require('hbs')
// const express = require('express')

// var app = express();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

// const port = 3000

// const viewPath = path.join(__dirname, '../public/views')
// const partialsPath = path.join(__dirname, '../public/views/partials')
// const public = path.join(__dirname, '../public')

// app.use(express.static(path.join(__dirname, '../public')))
// app.set('view engine', 'hbs')
// app.set('views', viewPath)
// hbs.registerPartials(partialsPath)

// hbs.registerHelper('welcome-message', (message) => {
//     return message
// })

// app.get('/', (req, res) => {
//     res.render('index', {
//         'document-title': 'Node.js Playground',
//     })
// })

// io.on('connection', (socket) => {
//     console.log('new user connected')
// })


// app.listen(port, () => {
//     console.log('Server is running on port ' + port)
// })

const express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path')

var myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}

app.use(myLogger)
app.use(express.static(path.join(__dirname, '../public')))


app.get('/', function(req, res){
    console.log(__dirname)
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('an user connected');

  socket.on('update', () => {
    console.log('weahter update requested by user')
    io.emit('update_weather')
  });

  socket.emit('update_weather', ()  => {
    console.log('requesting weather update')
})

socket.on('weather', (weather_data) => {
  console.log('in socket.on weather_data')
  weatherData = weather_data
  io.emit('w', weather_data)
}) 

  socket.emit('test')
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

