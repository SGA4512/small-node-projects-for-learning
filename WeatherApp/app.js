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
B) And in weather.js I have the function defined in module.exports = function(location, callback). This function takes 2 arguments and that's what I am passing in here.
C) And that's the function that I am calling in app.js with
weather(argv.l, function(currentWeather) {})
D) The same goes for location(), i.e. I am calling this function as its been defined in location.js with module.exports. location() function takes only one argument, so we are passing 1 argument here (unlike weather()).
*/

if (typeof argv.l === 'string' && argv.l.length > 0) {
    console.log('Location was provided');
    /* Paul - Below, commented out code was with callback, but finally I am implementing Promise instead of callback. But keeping the below, just for my own learning to be able to compare the difference.

    weather(argv.l, function(currentWeather) {
        console.log(currentWeather);
    });
    */
    weather(argv.l).then(function(currentWeather) {
        console.log(currentWeather);
    }).catch(function(error) {
        console.log(error);
    })
} else {
    console.log('Location was not provided, guessing it from your Computer IP address');
    location().then(function(loc) {
       return weather(loc.city);    // If location was successfully returned in the above line, then this line is where, I am fetching the weather. This is a good learning case for chaining then methods. That is, I am fetching location first and THEN, I am with 'then()' method I chaining weather to that location.
    }).then(function(currentWeather) {
        console.log(currentWeather);
    }).catch(function(error) {
        console.log(error);
    });
/* Note for own learning -
1) the line < return weather(loc.city); > Its the same implementation of the weather() function, as to the immediately above case, when location was explicitly provided.
2) The first .then in line < location().then(function(loc) > implements the logic that if location() function successfully returned a value, THEN the next function will be called.
3) And per the way Promises work, after then() whatever function I attach (to that then() method) will get called with the previous Promise's resolved value. Here that resolved value is coming from location.js (resolve(body)) and the value is the JSON response with all the location data.
 */

    /* Paul - Below commented out code was with callback, but now am implementing Promise.
    location(function(location) {
        if(location) {
            weather(location.city, function(currentWeather) {
                console.log(currentWeather);
            });
        } else {
            console.log('Unable to guess location');
        }
     }); */
}