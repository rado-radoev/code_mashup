
$(document).ready(function() {
    run_mustache()  
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

