require('dotenv').config();

var Gpio = require('onoff').Gpio;
var { ifttPost } = require('./iftt_actions');

const led = new Gpio(5, 'out');
const pir = new Gpio(21, 'in', 'both', { debounceTimeout: 10 });

function pirWatch() {
    pir.watch( (err, value) => {

        if (err) {
            throw err;
        }
    
        if (value == 1) {
            // console.log('Intruder alert');
            led.writeSync(1);

            let event_url = process.env.IFTT_MOTION_DETECTED_URL;
            ifttPost(event_url, 'Motion Sensor', undefined, undefined);
        } else {
            // console.log('Intruder gone');
            led.writeSync(0);
        }
    });
}

function unwatch() {
    pir.unwatch();
}

process.on('SIGINT', () => {
    unwatch();
    led.unexport();
    pir.unexport();
  });

module.exports = {
    pirWatch,
    unwatch
};
