const socket = io();

// https://www.w3schools.com/jquery/jquery_ref_selectors.asp

socket.on('test', () => {
    console.log('testtttttt')
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
    alert('hi')
    setInterval( upd , 10000)

    let url = 'http://localhost:3000/test'

    let data = {
        endPoint: url
    };

    $.ajax({
        url: url,
        method: 'POST',
        data: url,
        dataType: 'json' 
      }).done(function(response) {
          console.log(typeof response)
          console.log(response['message']);
      });
})

function upd() {
    socket.emit('update')
}

function getDate() {
    var date = new Date()
    setInterval(date.toLocaleString(), 1000)
}
 