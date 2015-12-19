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

/* My own very basic note on how the weather() and location() function is being called in app.js -
A) At the top of app.js I have declared the 2 variables weather and location and required the respective .js files
B) And in weather.js I have the function defined in module.exports = function(location, callback).
C) And that's the function that I am calling in app.js with
weather(argv.l, function(currentWeather) {})
D) The same goes for location(), i.e. I am calling this function as its been defined in location.js with module.exports
*/

if (typeof argv.l === 'string' && argv.l.length > 0) {
    console.log('Location was provided');
    weather(argv.l, function(currentWeather) {
        console.log(currentWeather);
    });
} else {
    console.log('Location was not provided');
    location(function(location) {
        if(location) {
            weather(location.city, function(currentWeather) {
                console.log(currentWeather);
            });
        } else {
            console.log('Unable to guess location');
        }

    });
}