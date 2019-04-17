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

app.use(express.json());
app.use(express.static(path.join(__dirname, './public/')));
app.use(myLogger);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/weathericon/:id', (req, res) => {
    let iconId = req.params.id;
    var icon = displayWeatherIcon(iconId)
    console.log(icon)
    res.send(JSON.stringify({icon}));
})

app.post('/test', (req, res) => {
    console.log(req.body);
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
  