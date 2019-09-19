require('dotenv').config();
var Gpio = require('onoff').Gpio;

var { ifttPost } = require('./iftt_actions');

const sensor = new Gpio(20, 'in', 'both');
const led = new Gpio(19, 'out');

function sensorWatch() {
    sensor.watch( (err, value) => {
        if (err) {
            throw err;
        }

        if (value == 1) {
            console.log('value is 1');
            console.log('led on');
            led.writeSync(1);

            let event_url = process.env.IFTT_MOTION_DETECTED_URL;
            ifttPost(event_url, 'Motion Sensor', undefined, undefined);
        } else {
            console.log('value is 0')
            console.log('led off');
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
