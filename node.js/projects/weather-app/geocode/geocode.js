const request = require('request')
const fs = require('fs')

var encodeAddress = (address) => {
  return encodeURIComponent(address);
};

var getAPIKey = (file) => {
  var key = fs.readFileSync(file, 'utf-8');
  return key.substring(0, key.length - 1);
}

var constructURL = (address) => {
  var api_key = getAPIKey('./playground/api_key');
  var encodedAddress = encodeAddress(address);
  return `http://www.mapquestapi.com/geocoding/v1/address?key=${api_key}&location=${encodedAddress}`;
};

var req = (address, callback) => {
  url = constructURL(address);

  request({
    url,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to weather server');
    } else if (body.info.statuscode === 400) {
      callback((body.info.messages[0]).split(': ', 2)[1]);
    } else {
      callback(undefined, {
        statusCode: response.statusCode,
        street: body.results[0].providedLocation.location,
        latitude: body.results[0].locations[0].latLng.lat,
        longitude: body.results[0].locations[0].latLng.lng
      });
    }
  });

};

var geocodeAddress = (address, callback) => {
  req(address, callback);
};

module.exports = {
  geocodeAddress
};
