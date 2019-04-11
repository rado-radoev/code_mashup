const socket = io()

$(document).ready(function() {
    
    var clock = $('.clock').FlipClock({
        clockFace: 'TwelveHourClock'
    });

    run_mustache();

})

function run_mustache() {
    
    // Change Default Mustache Tags to avoid conflicts with handlebars
    Mustache.tags = ["[[", "]]"];

    //Get Template
    var template = $('#template').html();

    //Prepare Template for Mustache
    Mustache.parse(template);

    //Render template
    var rendered = Mustache.render(template, {TESTTEST: "Luke"});

    //Update ID messages with new template
    $('#template').html(rendered);
 
}

socket.on('w', (weatherData) => {
    console.log('weather')
    console.log(weatherData)
});
