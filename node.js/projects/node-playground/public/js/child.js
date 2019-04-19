const socket = io();

// https://www.w3schools.com/jquery/jquery_ref_selectors.asp

socket.on('test', () => {
    // console.log('testtttttt')
});


socket.on('w', (weatherData) =>  {
    console.log(weatherData)
    weatherDataJson = JSON.parse(weatherData)

    custObj = {
        weather: 'The Weather Today',
        city: weatherDataJson['city']['city'],
        temp: weatherDataJson['weather']['main']['temp'],
        humidity: weatherDataJson['weather']['main']['humidity'],
        temp_min: weatherDataJson['weather']['main']['temp_min']
    }

    html = Handlebars.templates['show-weather'](custObj)
    $('#Weather').html(html)



    // $( "#city" ).text( weatherDataJson['city']['city'] );
    // $( "#temp" ).text( weatherDataJson['weather']['main']['temp'] );
    // $( "#humidity" ).text( weatherDataJson['weather']['main']['humidity'] );
    // $( "#temp_min" ).text( weatherDataJson['weather']['main']['temp_min'] );
});

$(function() {
    //alert('hi')
    //setInterval( upd , 10000)

    // var jqxr = $.post('http://localhost:3000/test', () => {
    //     alert('success')
    // })
    // location = geoFindMe()
    // console.log(location)
    // sendLocation(location.longitude, location.latitude)
    geoFindMe()

})

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
     sendLocation(longitude, latitude)
   }
 
   function error() {
     console.error('Unable to retrieve your location');
   }
 
   if (!navigator.geolocation) {
     console.error('Geolocation is not supported by your browser');
   } else {
    //  console.log('Locating…');
     navigator.geolocation.getCurrentPosition(success, error);
   }
 }

function upd() {
    socket.emit('update')
}

function getDate() {
    var date = new Date()
    setInterval(date.toLocaleString(), 1000)
}
 