var socketio = require('socket.io');
var io = socketio();
var socket_api = {};
var armed = false;

socket_api.io = io;
socket_api.armed = armed;

io.on('connection', (socket) => {
    console.log(`armed: ${armed}`);
    socket.on('getledstatus', (status) => {
        socket.emit('ledstatus', status++);
    });

    socket.emit('armed');

    socket.on('statusChange', (newstatus) => {
        armed = newstatus;
        console.log('new status', armed);
    });

    socket.on('getstatus', () => {
        socket.emit('sysStatus', armed);
    })

    console.log('Connected client');
    socket.emit('connected', {
        connected: 'Yay!'
    });

    socket.on('testmessage', function (data, callback) {
        console.log('Socket (server-side): received message:', data);
        var responseData = {
            string1: 'I like ',
            string2: 'bananas ',
            string3: ' dude!'
        };
        //console.log('connection data:', evData);
        callback(responseData);
    });
});


  module.exports = socket_api;
