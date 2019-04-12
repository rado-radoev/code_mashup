const socket = io();

// https://www.w3schools.com/jquery/jquery_ref_selectors.asp

socket.on('test', () => {
    console.log('testtttttt')
});


socket.on('w', (weatherData) =>  {
    console.log(weatherData)
    weatherDataJson = JSON.parse(weatherData)
    $( "#city" ).text( weatherDataJson['city']['city'] );
    $( "#temp" ).text( weatherDataJson['weather']['main']['temp'] );
    $( "#humidity" ).text( weatherDataJson['weather']['main']['humidity'] );
    $( "#temp_min" ).text( weatherDataJson['weather']['main']['temp_min'] );
});

$(function() {
    alert('hi')
    socket.emit('update')
})