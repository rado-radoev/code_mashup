var socket = io();

$(document).ready(function() {
    var socket = io.connect('http://localhost');
})


socket.on('test', (testObj) => {
    console.log(testObj['test'])
})

