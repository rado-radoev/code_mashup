const request = require('request');
const fs = require('fs')
const geocode = require('../geocode/geocode')

var get_api = () => {
  var key = fs.readFileSync('./weather/weather_api', 'utf-8');
  return key.substring(0, key.length - 1);
}

var get_latlngFromAddress = (address, position) => {
  var pos;
  debugger;
  if (typeof address === JSON) {
    try {
      if (position === 'lat') {
        pos = address.latitude;
      } else if (position === 'lng') {
        pos = address.longitude;
      }
    } catch (err) {
      console.log('Incorrect address.');
    }
  }

  return pos;
};

var get_latitude = (address) => {
  return get_latlngFromAddress(address, 'lat');
};

var get_longitude = (address) => {
  return get_latlngFromAddress(address, 'lng');
}

var constructURL = (lat, lng) => {
  api_key = get_api();
  url = `https://api.darksky.net/forecast/${api_key}/${lat},${lng}`;

  return url;
};

var queryAddress = (address, callback) => {
  geocode.geocodeAddress(address, (errorMessage, results) => {
    if (errorMessage) {
      console.log(erroMessage);
    } else {
      callback(results);
    }
  });
}

var req = (address, callback) => {
  queryAddress(address, (locationResults) => {
    var url = constructURL(locationResults.latitude, locationResults.longitude);
  });
  request({
    url,
    json: true
  }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        callback(undefined, {
          curTemp: body.currently.temperature,
          feelsLike: body.currently.apparentTemperature
        });
      } else {
        callback('Unable to fetch weather');
      }
  });

};


module.exports.req = req;
