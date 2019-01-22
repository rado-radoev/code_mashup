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

var geocodeAddress = (address) => {
  url = constructURL(address);

  return new Promise( (resolve, reject) => {
    request({
      url,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('Unable to connect to weather server');
      } else if (body.info.statuscode === 400) {
        reject((body.info.messages[0]).split(': ', 2)[1]);
      } else {
        resolve({
          statusCode: response.statusCode,
          street: body.results[0].providedLocation.location,
          latitude: body.results[0].locations[0].latLng.lat,
          longitude: body.results[0].locations[0].latLng.lng
        });
      }
    });
  });
};


geocodeAddress('').then( (location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
});
