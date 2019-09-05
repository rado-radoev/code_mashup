var io = require('socket.io')();
var SocketApi = {};

SocketApi.io = io;

io.on('connection', (socket) => {
    console.log(`socket with id ${socket.id} connected`)

    socket.on('hello', (msg) => {
        console.log(msg)
        socket.emit('back', 'hello back');
    })
});

module.exports = SocketApi;