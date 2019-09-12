const socket = io();

document.getElementById('ledbtn').onclick = function() {ledStat()};

function ledStat() {
 socket.emit('getledstatus', 1);   
};

socket.on('armed', () => {
    socket.emit('statusChange', true);
    socket.emit('getstatus');
});

socket.on('sysStatus', (status) => {
    console.log('armed', status);
})

// 'connected' is our custom message that let's us know the user is connected
socket.on('connected', function (data) {
    console.log('Socket connected (client side):', data);

    // Now that we are connected let's send our test call with callback
    socket.emit('testmessage', {
        payload: 'let us see if this worketh'
    }, function (responseData) {
        console.log('Callback called with data:', responseData);
    });
});


socket.on('ledstatus', (ledstatus) => {
    console.log(`Led status is: ${ledstatus}`);
    document.getElementById('ledbtn').textContent = `LED STAT ${ledstatus}`;
});

socket.on('getter', () => {
    console.log('I\'m in the getter');
});

socket.on('post', (postdata) => {
    console.log(postdata);
},)
