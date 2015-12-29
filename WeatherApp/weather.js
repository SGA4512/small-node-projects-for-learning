var request = require('request');
// My own learning note - The above URL is what I get, when I navigate to https://openweathermap.org/api and then click on "more" icon under 'Current Weather data' and then under "Examples of API calls:" I click on the link for 'London' (api.openweathermap.org/data/2.5/weather?q=London). The page that is opened will give me the json data for London and will automatically assign an id to the URL.

// The below chunk of code for module.exports under request() function per guidance from https://github.com/request/request

module.exports = function(location) {
    return new Promise(function(resolve, reject) {
        var encodedLocation = encodeURIComponent(location);
        var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + encodedLocation + '&units=imperial&appid=2de143494c0b295cca9337e1e96b00e0';

        if (!location) {
            return reject('No location provided');
        }

        request({
            url: url,
            json: true
        }, function(error, response, body) {
            if(error) {
                reject('Unable to fetch weather.');
            } else {
                resolve('It\'s ' + body.main.temp + ' in ' + body.name + '!');
            }
        });
    });
}