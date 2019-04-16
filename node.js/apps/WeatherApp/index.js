const express = require('express');
const path    = require('path');
const fs      = require('fs')
const hbs     = require('hbs');

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

hbs.registerPartials(partialsPath)

var myLogger = function (req, res, next) {
    console.log(req.method, req.url);
    next();
}  


app.use(express.static(path.join(__dirname, './public/')));
app.use(myLogger);

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/weathericon', (req, res) => {
    const name = req.body
    console.log(name)
    var icon = getWeatherIcon('01d')
    res.send({icon});
})

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
    io.emit('w', weatherData)
  }) 
  
    socket.emit('test')
});

// get weather icons
function displayWeatherIcon(iconId) {

    let dir = path.join(__dirname, '/public/img/weather_icons')
    var files = fs.readdirSync(dir);
    for(var i in files){
        if (!files.hasOwnProperty(i)) continue;
        if (files[i].startsWith(iconId)) {
            return dir +'/' +files[i]; 
        }
    }
}

  
http.listen(3000, function(){
    console.log('listening on *:3000');
});
  