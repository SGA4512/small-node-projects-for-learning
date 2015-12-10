var weather = require('./weather.js');
var location = require('./location.js');

weather(function(currentWeather) {
    console.log(currentWeather);
});

location(function(currentLocation) {
   console.log('City: ' + location.city);
   console.log('log/lat' + location.loc);
});

