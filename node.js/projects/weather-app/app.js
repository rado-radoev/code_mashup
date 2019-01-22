const yargs = require('yargs')
const weather = require('./weather/weather')

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

weather.req(argv.address, (errorMessage, status) => {
    if (errorMessage) {
      console.log(errorMessage);
    } else {
      console.log("Curr temp: " + status.curTemp);
      console.log("Feels like:" + status.feelsLike);
    }
});
