const hbs     = require('hbs');
const express = require('express');
const path    = require('paht');
const hbs     = require('handlebars');

var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);
var {log}   = require('./routes/MainRoute');
var {mainRoute} = require('./middleware/Logger');

const port = 3000;

const viewPath = path.join(__dirname, './views/');
const partialsPath = path.join(__dirname, './views/partials/');
const templatesPath = path.join(__dirname, './views/templates/');

app.set('view engine', 'hbs');
app.set('views', viewPath);

var myLogger = function (req, res, next) {
    console.log(req.method, req.url);
    next();
}  


app.use(express.static(path.join(__dirname, './public/')));
app.use(myLogger);

app.get('/', (req, res) => {
    res.render('index');
});

io.on('connection', (socket) => {
    console.log('user connected');
  
    socket.on('update', () => {
      console.log('weahter update requested by user')
      io.emit('update_weather')
    });
  
    socket.emit('update_weather', ()  => {
      console.log('requesting weather update')
  })
  
  socket.on('weather', (weather_data) => {
    console.log('weather_data received from client')
    weatherData = weather_data
    io.emit('w', weather_data)
  }) 
  
    socket.emit('test')
});
  
http.listen(3000, function(){
    console.log('listening on *:3000');
});
  