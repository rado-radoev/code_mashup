const socket = io()

socket.emit('hello', 'this is me');

socket.on('back', (msg) => {
    console.log(msg);
})