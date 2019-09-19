require('dotenv').config();
var Gpio = require('onoff').Gpio;

var { ifttPost } = require('./iftt_actions');

const sensor = new Gpio(20, 'in', 'both', { debounceTimeout: 10 });
const led = new Gpio(19, 'out');

function sensorWatch() {
    sensor.watch( (err, value) => {
        if (err) {
            return err;
        }

        if (value == 1) {
            console.log('Window is open');
            led.writeSync(1);

            let event_url = process.env.IFTT_MOTION_DETECTED_URL;
            ifttPost(event_url, 'Window Sensor', undefined, undefined);
        } else {
            console.log('Window is closed')
            led.writeSync(0);
        }
    });
}


function unwatch() {
    sensor.unwatch();
};

process.on('SIGINT', () => {
    unwatch();
    led.unexport();
    sensor.unexport();
  });

module.exports = {
    sensorWatch,
    unwatch
};
