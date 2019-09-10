const socket = io();

document.getElementById('#led').addEventListener('click', ledclicked);

function ledclicked() {
    socket.emit('ledclicked');
}

socket.on('ledstatus', (ledstatus) => {
    if (ledstatus === 0) {
        document.getElementById('#led').value = "LED off";
    } else {
        document.getElementById('#led').value = "LED On";
    }
});
