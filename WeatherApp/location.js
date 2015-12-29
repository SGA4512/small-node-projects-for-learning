var request = require('request');
var url = 'http://ipinfo.io/';
// Important Note - In the above url, I have to specifically use 'http' and NOT 'https' as the free scheme does not support https or ssl per ipinfo's policy (mentioned clearly in their homepage).


// My own learning note - The below code will generate (fetch) a JSON response containing all the data for the ip of my computer from https://ipinfo.io/ and then in app.js I have the code to console.log some of the fetched data in the function(currentLocation){}. And the actual work of figuring out my computer's IP will be done by the site itself. When this URL - 'http://ipinfo.io/' is opened in browser, it immediately shows my city and and other IP info. And all I do with the below codes (per https://github.com/request/request ) is fetching that same IP data in JSON format).

module.exports = function(callback) {
    return new Promise(function(resolve, reject) {
        request({
            url: url,
            json: true
        }, function(error, response, body) {
            if(error) {
                reject('Unable to guess location');
            } else {
                resolve(body);
            }
        });
    })
};