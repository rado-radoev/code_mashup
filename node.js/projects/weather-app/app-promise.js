const yargs = require('yargs');
const axios = require('axios');
const fs = require('fs')

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

var encodeAddress = (address) => {
  return encodeURIComponent(address);
};

var getAPIKey = (file) => {
  var key = fs.readFileSync(file, 'utf-8');
  return key.substring(0, key.length - 1);
}

var encodedAddress = encodeAddress(argv.address);
var geocode_api = getAPIKey('./playground/api_key');
var geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${geocode_api}&location=${encodedAddress}`;


axios.get(geocodeUrl).then((response) => {
  if (response.status !== 200) {
    throw new Error('Unable to find address');
  }

  var lat = response.data.results[0].locations[0].latLng.lat;
  var lng = response.data.results[0].locations[0].latLng.lng;

  var weather_api = fs.readFileSync('./weather/weather_api', 'utf-8');
  weather_api = weather_api.substring(0, weather_api.length - 1);
  var weatherUrl = `https://api.darksky.net/forecast/${weather_api}/${lat},${lng}`;

  return axios.get(weatherUrl);
}).then( (response) => {
  var temp = response.data.currently.temperature;
  var feelsLike = response.data.currently.apparentTemperature;
  console.log(`Current temps is: ${temp}. It feels like: ${feelsLike}`);
}).catch((e) => {
  console.log(e);
});
