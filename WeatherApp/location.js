var request = require('request');
var url = 'http://ipinfo.io/';
// Important Note - In the above url, I have to specifically use 'http' and NOT 'https' as the free scheme does not support https or ssl per ipinfo's policy (mentioned clearly in their homepage).


// My own learning note - The below code will generate a response with json output containing all the data for the ip of my computer from https://ipinfo.io/ and then in app.js I have the code to console.log some of the fetched data in the function(currentLocation){}

module.exports = function(callback) {
    request({
        url: url,
        json: true
    }, function(error, response, body) {
        if(error) {
            callback();
        } else {
            callback(body);
        }
    });
};