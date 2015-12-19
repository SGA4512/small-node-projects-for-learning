var weather = require('./weather.js');
var location = require('./location.js');

// setting up yargs to have a --location or -l arguments
var argv = require('yargs')
    .option('location', {
        alias: 'l',
        demand: false,
        description: 'Location to fetch weather for',
        type: 'string'
    })
    .help('help')
    .argv;


/*
weather(function(currentWeather) {
    console.log(currentWeather);
});

location(function(location) {
   if(!location) {
       console.log('Unable to fetch location');
       return;
   }

   console.log('city: ' + location.city);
   console.log('log/lat ' + location.loc);
});*/


if (typeof argv.l === 'string' && argv.l.length > 0) {
    console.log('has location');
    weather(argv.l, function(currentWeather) {
        console.log(currentWeather);
    });
} else {
    console.log('Location not provided');
}