alert('hi')

// const a = $('body')
// console.log(a)

// // Elements
// const $mapFrame = document.querySelector('#map-frame')
    
// // Templates
// const mapFrameTemplate = document.querySelector('#map-frame-template').innerHTML

// // Render iFrame with Mustache
// const html = Mustache.render(mapFrameTemplate, {
//   TESTTEST: 'THIS IS A TEST'
// })

// $mapFrame.insertAdjacentHTML('beforeend', html)

// function getLocation() {
//     if (!navigator.geolocation) {
//         return alert('Geolocation is not supported by your browser')
//     }
//         var options = {
//             enableHighAccuracy: false,
//             timeout: 5000,
//             maximumAge: 6000
//         }
    
//         function success(pos) {
//             return pos.coords
//         }
    
//         function error(err) {
//             console.warn(`ERROR(${err.code}): ${err.message}`)
//         }
//         navigator.geolocation.getCurrentPosition(success, error, options)  
// }

function updateTime() {
    // $('clock').fitText(1.3)
    var time = moment.format('LTS')
    $('clock').html(time)
    setInterval(updateTime, 1000)
}

updateTime()


