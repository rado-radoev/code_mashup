var Gpio = require('onoff').Gpio;
var request = require('request');
require('dotenv').config();

const led = new Gpio(5, 'out');
const pir = new Gpio(21, 'in', 'both');

function pirWatch() {
    pir.watch( (err, value) => {

        if (err) {
            throw err;
        }
    
        if (value == 1) {
            console.log('Intruder alert');
            console.log('led on');
            led.writeSync(1);

            let event_url = process.env.IFTT_MOTION_DETECTED_URL;
            ifttPost(event_url);


        } else {
            console.log('Intruder gone');
            console.log('led off');
            led.writeSync(0);
        }
    });
}

function ifttPost(iftt_event_url) {
    var postData = {
        value1 : "",
        value2 : "",
        value3: ""
    }

    var url = iftt_url_event;

    var options = {
        method: 'post',
        body: postData,
        json: true,
        url
    }

    request(options, (error, res, body) => {
        if (error) {
            console.error('error posting to IFTT', error);
            throw error;
        }

        var headers = res.headers
        var statusCode = res.statusCode
        console.log('headers: ', headers)
        console.log('statusCode: ', statusCode)
        console.log('body: ', body)
    })
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
