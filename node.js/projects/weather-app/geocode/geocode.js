const request = require('request')
const fs = require('fs')

var encodeAddress = (address) => {
  return encodeURIComponent(address);
};

var getAPIKey = (file) => {
  return fs.readFileSync(file, 'utf-8');
}

var constructURL = (address) => {
  var api_key = getAPIKey('./playground/api_key');
  var encodedAddress = encodeAddress(address);
  return `http://www.mapquestapi.com/geocoding/v1/address?key=${api_key}&location=${encodedAddress}`;
};

var req = (address) => {
  url = constructURL(address);

  request({
    url,
    json: true
  }, (error, response, body) => {
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

};

var geocodeAddress = (address) => {
  req(address);
};

module.exports = {
  geocodeAddress
};
