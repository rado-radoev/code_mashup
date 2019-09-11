var Gpio = require('onoff').Gpio;

const sensor = new Gpio(8, 'in', 'rising');
const led = new Gpio(9, 'out');

sensor.watch( (err, value) => {
    if (err) {
        throw err;
    }

    if (value == 1) {
        console.log('value is 1');
        console.log('led on');
        // led.writeSync(1);
    } else {
        console.log('value is 0')
        console.log('led off');
        // led.writeSync(0);
    }
});

function unwatch() {
    sensor.unwatch();
};

module.exports = {
    unwatch
};
