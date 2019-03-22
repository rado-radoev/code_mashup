
$(document).ready(function() {
    run_mustache()  
    setInterval(startTime, 1000)
    getLocation()
})

function run_mustache() {

    Mustache.tags = ["[[", "]]"];
    
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

function getLocation() {
    const locationForm = document.querySelector('#location-form')
    const search = document.querySelector('input[name=location-input]')

    locationForm.addEventListener('submit', (e) => {
        e.preventDefault()

        let location = search.value

        search.value = ''
        console.log(location)
    })
}
