const socket = io();

socket.on('connected', (data) => {
    console.log(`Message from server ${data}`);
});