var Gpio = require('onoff').Gpio;

const led = new Gpio(5, 'out');
var pir = new gpio(12, 'in', 'both');

pir.watch(function(err, value) {
    if (value == 1) {
        console.log('Intruder alert');
    } else {
        console.log('Intruder gone');
    }
});


