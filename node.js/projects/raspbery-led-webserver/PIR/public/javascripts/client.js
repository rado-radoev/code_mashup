const socket = io();

/* Events */
document.getElementById('btn-on').addEventListener('click', function() {
    btnControl('btn-on');
});
document.getElementById('btn-off').addEventListener('click', function() {
    btnControl('btn-off');
});

/* Functions */
function convertStatusToString(systemStatus) {
    return (systemStatus ? "Armed": "Disarmed");
}

function btnControl(btn) {
    socket.emit('btnPressed', btn);
    
    if (btn === 'btn-on') {
        document.getElementById('btn-on').disabled = true;
        document.getElementById('btn-off').disabled = false;
    } else {
        document.getElementById('btn-on').disabled = false;
        document.getElementById('btn-off').disabled = true;
    }
}

socket.on('newSystemStatus', (systemStatus) => {
    var currStatus = document.getElementById('system-status').innerHTML;
    var newStatus = currStatus.substring(0 , currStatus.indexOf(': ')) + `: ${convertStatusToString(systemStatus)}`;
    document.getElementById('system-status').innerHTML = newStatus;
    console.log(`System is currently ${convertStatusToString(systemStatus)}`);
});

socket.on('connected', (data) => {
    console.log(`Message from server: ${data.payload}`);

    socket.emit('getSystemStatus', (callbackData) => {
        var systemStatus = callbackData ? "Armed" : "Disarmed"
        console.log(`System is currently ${systemStatus}`);
    });
});