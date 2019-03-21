
$(document).ready(function() {
    run_mustache() 
})

function run_mustache() {
    
    // Elements
    const messages = document.querySelector('#messages')
    console.log(messages)
    // Templates
    const messageTemplate = document.querySelector('#message-template').innerHTML
    console.log(messageTemplate)

    const html = Mustache.render(messageTemplate, {
        text: 'Play safe'
    })
    messages.insertAdjacentHTML('afterbegin', html)    
 }

function run_mustache2() {
    var viewData = { text: 'Jonny' }
    var template = $('#message-template').html()
    $('body').append(Mustache.render(template, viewData))
}
