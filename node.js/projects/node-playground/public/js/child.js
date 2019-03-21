
$(document).ready(function() {
    run_mustache()  
    setInterval(startTime, 1000)
})

function run_mustache() {
    
    // Elements
    const $messages = document.querySelector('#messages')

    // Templates
    const messageTemplate = document.querySelector('#message-template').innerHTML

    const html = Mustache.render(messageTemplate, {
        text: 'Play safe'
    })
    $messages.insertAdjacentHTML('beforeend', html)    
 }

function startTime() {
    $('#clock').fitText(1.3)

    $('#clock').html(moment().format('LTS'))
}
