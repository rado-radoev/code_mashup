const socket = io();

/* Globals */
const btnOn = document.getElementById('btn-on');
const btnOff = document.getElementById('btn-off');
const btnOnWindow = document.getElementById('btn-on-window');
const btnOnMotion = document.getElementById('btn-on-motion');

/* Events */
btnOn.addEventListener('click', function() {
    btnClicked(btnOn.id);
});
btnOff.addEventListener('click', function() {
    btnClicked(btnOff.id);
});
btnOnWindow.addEventListener('click', function() {
    btnClicked(btnOnWindow.id);
});
btnOnMotion.addEventListener('click', function() {
    btnClicked(btnOnMotion.id);
});


/* Functions */
function convertStatusToString(systemStatus) {
    return (systemStatus ? "Armed": "Disarmed");
}

function btnClicked(btn) {
    socket.emit('btnPressed', btn);
}

function btnControl(btn) {
    if (btn === btnOn.id) {
        btnOn.disabled = true;
        btnOnWindow.disabled = true;
        btnOnMotion.disabled = true;
        btnOff.disabled = false;
    } else if (btn === btnOnWindow.id) {
        btnOn.disabled = true;
        btnOnWindow.disabled = true;
        btnOff.disabled = false;
    } else if (btn === btnOnMotion.id) {
        btnOn.disabled = true;
        btnOnMotion.disabled = true;
        btnOff.disabled = false;
    } else {
        btnOn.disabled = false;
        btnOnWindow.disabled = false;
        btnOnMotion.disabled = false;
        btnOff.disabled = true;
    }
}

socket.on('newSystemStatus', (systemStatus, btnPressed) => {
    var systemStatusElement = document.getElementById('system-status')
    var currStatus = systemStatusElement.innerHTML;
    var newStatus = currStatus.substring(0 , currStatus.indexOf(': ')) + `: ${convertStatusToString(systemStatus)}`;
    
    systemStatusElement.innerHTML = newStatus;
        
    console.log(`System is currently ${convertStatusToString(systemStatus)}`);

    if (systemStatus) {
        btnControl(btnPressed);
    } else {
        btnControl(btnOff.id);
    }
});

socket.on('connected', (data) => {
    console.log(`Message from server: ${data.payload}`);

    socket.emit('getSystemStatus', (callbackData) => {
        var systemStatus = callbackData ? "Armed" : "Disarmed"
        console.log(`System is currently ${systemStatus}`);

        if (callbackData) {
            btnControl(btnOn.id);
        } else {
            btnControl(btnOff.id);
        }
    });
});