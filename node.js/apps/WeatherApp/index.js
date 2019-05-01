const express = require('express');
const path    = require('path');
const fs      = require('fs')
const hbs     = require('hbs');
const spawn   = require("child_process").spawn

var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);
var { log }   = require('./routes/MainRoute');
var { mainRoute } = require('./middleware/Logger');

function launchPython() {
    const pythonProcess = spawn('python',["utils/python/controller2.py"]);
    pythonProcess.stdout.on('data', (data) => {
        console.log(data.toString())
     });
}

function launchJava() {
    var exec = require('child_process').exec, child;
    child = exec('java -jar /Users/superlamer/GitHub/code_mashup/node.js/apps/WeatherApp/utils/java/weather.jar',
    function (error, stdout, stderr){
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if(error !== null){
    console.log('exec error: ' + error);
    }
    });
}

// launchJava()
launchPython()

// Default applicaiton port
const port = 3000;

// HBS paths
const viewPath = path.join(__dirname, './views/');
const partialsPath = path.join(__dirname, './views/partials/');
const templatesPath = path.join(__dirname, './views/templates/');

// Setting up view engine
app.set('view engine', 'hbs');
app.set('views', viewPath);

hbs.registerPartials(partialsPath)

// Future function for logging - Look @ implementing Winston npm
var myLogger = function (req, res, next) {
    console.log(req.method, req.url);
    next();
} 


// Express middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, './public/')));
app.use(myLogger);


// Express render index
app.get('/', (req, res) => {
    res.render('index');
});

// Utility link, used to query weather icon from 
// folder of available icons
// info is passed by client and sent back to the 
// client is the icon relative path
app.get('/weathericon/:id', (req, res) => {
    let iconId = req.params.id;
    var icon = displayWeatherIcon(iconId)
    console.log(icon)
    res.send(JSON.stringify({icon}));
})


// Post not used
app.post('/test', (req, res) => {
    // console.log(req.body);
});

// Socket io, responsible for
// grabbing data from python
io.on('connection', (socket) => {
    console.log('user connected');
  
    // Request received from one of the clients
    // to query Python for weather data
    socket.on('update', () => {
      console.log('weahter update requested by user')
      io.emit('update_weather')
    });

    // Pulls new weather from the internet
    socket.on('pull_new_weather', () => {
        console.log('requesting new weather from java')
        io.emit('pull_new_weather', (5391811))
    })
  
    // Request weather updat from Python
    socket.emit('update_weather', ()  => {
      console.log('requesting weather update')
  })
  
  // Weather data received
  socket.on('weather', (weather_data) => {
    console.log('weather_data received from client')
    weatherData = weather_data
    // Send weather data to everyone 
    // The client that requested it will handle it.
    io.emit('w', weatherData)
  }) 
  
    // Unused emdt
    // socket.emit('test')
});

// get weather icons
function displayWeatherIcon(iconId) {

    // Loop throught the folder with all icons
    // And when the one that matches the iconID is found
    // return the full path
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
  