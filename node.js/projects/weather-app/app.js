const request = require('request');
const fs = require('fs')
const yargs = require('yargs')

var argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch the weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var api_key=fs.readFileSync('./playground/api_key', 'utf-8');
var encodedAddress = encodeURIComponent(argv.address);

var urlString = `http://www.mapquestapi.com/geocoding/v1/address?key=${api_key}&location=${encodedAddress}`


request({
  url: urlString,
  json: true
}, (error, response, body) => {
  debugger;
  if (error) {
    console.log('Unable to connect to weather server');
    console.log(error);
  } else if (body.info.statuscode === 400) {
    console.log((body.info.messages[0]).split(': ', 2)[1]);
  } else {
    // console.log(response);
    console.log('Status code: ' + response.statusCode);
    // console.log(JSON.stringify(body, undefined, 2));
    console.log('street:' + body.results[0].providedLocation.location );
    console.log('lat:' + body.results[0].locations[0].latLng.lat);
    console.log('lng:' + body.results[0].locations[0].latLng.lng);
    // console.log(urlString);
  }
});
