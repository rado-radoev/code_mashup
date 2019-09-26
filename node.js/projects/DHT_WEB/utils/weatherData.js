const request = require('request')

const getLatestData = (url, callback) => {
    var url = url;

    request({url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to server', undefined);
        } else if (response.body.length === 0) {
            callback('Unable to fetch data from server', undefined);
        } else {
            callback(undefined, response.body[0])
        }
    });
}


module.exports = getLatestData;