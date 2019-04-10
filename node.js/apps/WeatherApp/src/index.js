const express = require('express')
const weatherRouter = require('./routers/weather')

const app = express();
const port = process.env.PORT || 3000;

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log('New websocket connection')

    socket.emit('news', { hello: 'world' });
});

app.use(weatherRouter)

app.listen(port, () => {
    console.log('Server is up on port ', port)
});