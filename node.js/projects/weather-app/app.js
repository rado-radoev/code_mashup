const request = require('request');
const fs = require('fs')
const yargs = require('yargs')
const geocode = require('./geocode/geocode.js')

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

geocode.geocodeAddress(argv.address);
