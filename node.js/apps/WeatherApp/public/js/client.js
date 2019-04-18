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

// On document load
$(function() {
    //alert('hiiiiiiiiiiii')
    upd()
    setInterval( upd , 600000)
    clock;

    // PUll new weather from the interenet
    socket.emit('pull_new_weather')
    
})

// Request weather update from python
function upd() {
    socket.emit('update')
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
 