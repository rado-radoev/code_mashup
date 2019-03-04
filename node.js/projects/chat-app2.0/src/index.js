const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public/');


app.use(express.static(publicDirectoryPath));

// server (emit) -> client (receive) - countUpdated
// client (emit) -> server (receive) - increment

let count = 0;
io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    socket.emit('countUpdated', count);

    socket.on('increment', () => {
        count++
        // socket.emit('countUpdated', count) emit event to a single connection
        io.emit('countUpdated', count); // emit event to all connection
    });

});

server.listen(port, () => {
    console.log('Server listening on port', port);
});
