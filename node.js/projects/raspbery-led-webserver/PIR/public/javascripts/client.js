const socket = io();

/* Events */
document.getElementById('btn-on').addEventListener('click', function() {
    btnClicked('btn-on');
});
document.getElementById('btn-off').addEventListener('click', function() {
    btnClicked('btn-off');
});

/* Functions */
function convertStatusToString(systemStatus) {
    return (systemStatus ? "Armed": "Disarmed");
}

function btnClicked(btn) {
    socket.emit('btnPressed', btn);
}

function btnControl(btn) {
    if (btn === 'btn-on') {
        document.getElementById('btn-on').disabled = true;
        document.getElementById('btn-off').disabled = false;
    } else {
        document.getElementById('btn-on').disabled = false;
        document.getElementById('btn-off').disabled = true;
    }
}

socket.on('newSystemStatus', (systemStatus) => {
    var systemStatusElement = document.getElementById('system-status')
    var currStatus = systemStatusElement.innerHTML;
    var newStatus = currStatus.substring(0 , currStatus.indexOf(': ')) + `: ${convertStatusToString(systemStatus)}`;
    
    systemStatusElement.innerHTML = newStatus;
        
    console.log(`System is currently ${convertStatusToString(systemStatus)}`);

    if (systemStatus) {
        btnControl('btn-on');
    } else {
        btnControl('btn-off');
    }
});

socket.on('connected', (data) => {
    console.log(`Message from server: ${data.payload}`);

    socket.emit('getSystemStatus', (callbackData) => {
        var systemStatus = callbackData ? "Armed" : "Disarmed"
        console.log(`System is currently ${systemStatus}`);

        if (systemStatus) {
            btnControl('btn-on');
        } else {
            btnControl('btn-off');
        }
    });
});