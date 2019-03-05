const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const Filter = require('bad-words');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public/');


app.use(express.static(publicDirectoryPath));

// server (emit) -> client (receive) - countUpdated
// client (emit) -> server (receive) - increment

// let count = 0;
io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    socket.emit('message', 'Welcome');
    socket.broadcast.emit('message', 'A new user has joined');

    // socket.emit('countUpdated', count);

    // socket.on('increment', () => {
    //     count++
    //     // socket.emit('countUpdated', count) emit event to a single connection
    //     io.emit('countUpdated', count); // emit event to all connection
    // });

    socket.on('sendMessage', (message, callback) => {

        const filter = new Filter()
        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed')
        }

        io.emit('message', message);
        callback()
    });

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left');
    });

    socket.on('sendLocation', (crd, callback) => {
        io.emit('locationMessage', `https://google.com/maps?q=${crd.latitude},${crd.longitude}`)
        callback()
    });

});

server.listen(port, () => {
    console.log('Server listening on port', port);
});
