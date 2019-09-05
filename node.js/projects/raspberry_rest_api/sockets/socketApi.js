var socket_io = require(socket_io);
var io = socket_io();
var socketApi = {};

socketApi.io = io;

io.on('connection', (socket) => {
    console.log('socket connected');
})

module.exports = socketApi;