var Gpio = require('onoff').Gpio;

const led = new Gpio(5, 'out');
const pir = new Gpio(21, 'in', 'both');

pir.watch( (err, value) => {

    if (err) {
        throw err;
    }

    if (value == 1) {
        console.log('Intruder alert');
        console.log('led on');
        led.writeSync(1);
    } else {
        console.log('Intruder gone');
        console.log('led off');
        led.writeSync(0);
    }
});

//https://medium.com/@dan.laidlow/raspberry-pi-home-security-with-node-js-node-installation-adding-an-lcd-pir-sensor-7ce1bdc1339

function unwatch() {
    pir.unwatch();
}

module.exports = {
    unwatch
};
