var request = require('request');

function ifttPost(iftt_event_url) {
    var postData = {
        value1 : "",
        value2 : "",
        value3: ""
    }

    var url = iftt_event_url;

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

module.exports = ifttPost;