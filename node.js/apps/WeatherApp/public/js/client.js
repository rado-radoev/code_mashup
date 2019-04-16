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

    let icon = weatherDataJson['weather']['weather']['icon']
    let iconPath = getWeatherIcon(icon)

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

function getWeatherIcon(iconId) {
    let url = 'http://localhost:3000/weathericon'

    let data = {
        endPoint: url
    }

    $.ajax({
        url,
        method: 'POST',
        data: {
            url,
            iconId
        },
        dataType: 'json'
    }).done ((response) => {
        return response
    })
}

var clock = $('.clock').FlipClock({
    clockFace: 'TwelveHourClock',
    showSeconds: false
});
 