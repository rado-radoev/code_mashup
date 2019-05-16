const socket = io();

// https://www.w3schools.com/jquery/jquery_ref_selectors.asp

// Unused
// socket.on('test', () => {
//     console.log('testtttttt')
// });

// Weather information is received from Pytho
// Update the view
socket.on('w', (weatherData) =>  {
    console.log(weatherData)
    // Data is received as a string. Needs to be parsed as JSON
    weatherDataJson = JSON.parse(weatherData)
    
    // Data for city template
    cityObj = {
        City_Name: weatherDataJson['city']['city'],
        WeatherDescription: weatherDataJson['weather']['weather']['description'],
    }

    // Data for weather template
    weatherObj = {
        Temp: weatherDataJson['weather']['main']['temp'],
        Humidity: weatherDataJson['weather']['main']['humidity'],
        Min_Temp: weatherDataJson['weather']['main']['temp_min'],
        Pressure: weatherDataJson['weather']['main']['pressure'],
        Max_Temp: weatherDataJson['weather']['main']['temp_max'],
        Wind_Speed: weatherDataJson['weather']['wind']['speed'],
    }

    weatherhtml = Handlebars.templates['weather_info.hbs'](weatherObj)
    $('#weather-details').html(weatherhtml)
    
    cityhtml = Handlebars.templates['city_details.hbs'](cityObj)
    $('#city_details').html(cityhtml)

   
    // debugger;
    // Get relative path for weather icon
    var ico = weatherDataJson['weather']['weather']['icon']
    $.get('/weathericon/' + ico, function(data) {
        var objSentFromSrv = JSON.parse(data);
        var index = objSentFromSrv['icon'].indexOf('/img')
        var modObjSentFromSrv = objSentFromSrv['icon'].substring(index)
        console.log(modObjSentFromSrv)

        // Data for weather icon
        weatherIcon = {
            icon: modObjSentFromSrv
        }
    
        iconHtml = Handlebars.templates['weather_icon.hbs'](weatherIcon)
        $('#weather_icon').html(iconHtml)
    });
});

socket.on('indoor', (data) => {
  console.log(data)

  indoorDataJson = JSON.parse(data)
  t = (indoorDataJson['temp_data']['temp']).toFixed(2)
  h = (indoorDataJson['temp_data']['humidity']).toFixed(2)

  indoorObj = {
    indoor_temp: t,
    indoor_humidity: h
  }

  indoorHtml = Handlebars.templates['indoors'](indoorObj)
  $('#indoors-temp-humidity').html(indoorHtml)
})

// Request weather update from python
function upd() {
    socket.emit('update')
}

function upd_indoor_data() {
  socket.emit('update_indoor_data') 
}

function getDate() {
    var date = new Date()
    setInterval(date.toLocaleString(), 1000)
}

// Display Flip Clock
var clock = $('.clock').FlipClock({
    clockFace: 'TwelveHourClock',
    showSeconds: false
});

// Doing a post request. Copied from POSTMAN (best tool ever)
function sendLocation(lng, lat) {
    var data = JSON.stringify({
        "longitude": lng,
        "latitude": lat
      });
      
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          console.log(this.responseText);
        }
      });
      
      xhr.open("POST", "/test");
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("cache-control", "no-cache");
      
      xhr.send(data);
}

function geoFindMe() {
    
   function success(position) {
     const latitude  = position.coords.latitude;
     const longitude = position.coords.longitude;
     //sendLocation(longitude, latitude)

     locObj = {
        Longitude: longitude.toFixed(6),
        Latitude: latitude.toFixed(6)
    }
    // console.log(locObj)
    lochtml = Handlebars.templates['coords.hbs'](locObj)
    $('#coords').html(lochtml)
   }
 
   function error(e) {
     console.error('Unable to retrieve your location');
     console.error(e)
   }
 
   if (!navigator.geolocation) {
     console.error('Geolocation is not supported by your browser');
   } else {
    //  console.log('Locating…');
      navigator.geolocation.getCurrentPosition(success, error);
   }
 }
 

 // On document load
$(function() {
  //alert('hiiiiiiiiiiii')
  geoFindMe()
  upd()
  
  setInterval( [upd, geoFindMe] , 600000)
  clock;

  // PUll new weather from the interenet
  socket.emit('pull_new_weather')  

  setInterval(upd_indoor_data, 5000)
  
})