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

var constructURL = (address) => {
  api_key = get_api();
  lat = get_latitude(address);
  lng = get_longitude(address);
  url = `https://api.darksky.net/forecast/${api_key}/${lat},${lng}`;

  return url;
};

var queryAddress = (address) => {
  debugger;
  geocode.geocodeAddress(address, (errorMessage, results) => {
    if (errorMessage) {
      throw errorMessage;
    } else {
      return JSON.stringify(results, undefined, 2);
    }
  });
}


var req = (address, callback) => {

  debugger;
  var addr = queryAddress(address);
  var url = constructURL(addr);

  request({
    url,
    json: true
  }, (error, response, body) => {
      debugger;
      if (!error && response.statusCode === 200) {
        callback(undefined, temp = {curTemp: body.currently.temperature,
        feelsLike: body.currently.apparentTemperature})
      } else {
        callback('Unable to fetch weather');
      }
  })
};


module.exports.req = req;
