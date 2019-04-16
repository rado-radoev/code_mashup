const socket = io();

// https://www.w3schools.com/jquery/jquery_ref_selectors.asp

socket.on('test', () => {
    console.log('testtttttt')

});

socket.on('w', (weatherData) =>  {
    console.log(weatherData)
    weatherDataJson = JSON.parse(weatherData)
    cityObj = {
        City_Name: weatherDataJson['city']['city'],
        WeatherDescription: weatherDataJson['weather']['weather']['description'],
    }
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
});

$(function() {
    //alert('hiiiiiiiiiiii')
    upd()
    setInterval( upd , 10000)
    clock;
})

function upd() {
    socket.emit('update')
}

function getDate() {
    var date = new Date()
    setInterval(date.toLocaleString(), 1000)
}

function displayWeatherIcon(weatherIconCode) {
    fileList = [];
    
       var files = fs.readdirSync(dir);
       for(var i in files){
           if (!files.hasOwnProperty(i)) continue;
           var name = dir+'/'+files[i];
           if (!fs.statSync(name).isDirectory()){
               fileList.push(name);
           }
       }
       return fileList;
}

var clock = $('.clock').FlipClock({
    clockFace: 'TwelveHourClock',
    showSeconds: false
});
 