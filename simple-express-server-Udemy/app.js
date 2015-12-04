var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');


// parse application/x-www-form-urlencoded ( see - https://github.com/expressjs/body-parser)
app.use(bodyParser.urlencoded({ extended: false}));

// parse application/json
app.use(bodyParser.json());

// Set static path
app.use(express.static(path.join(__dirname, 'public')));

app.get('/people', function(req, res) {
    var people = [{
        first_name: "John",
        last_name: "Doe",
        age: 34,
        gender: "male"

    }, {
        first_name: "Tom",
        last_name: "Jackson",
        age: 27,
        gender: "male"

    }, {
        first_name: "Tracy",
        last_name: "Smith",
        age: 30,
        gender: "female"

    }];

    res.json(people);

    // My own learning note - By passing the array "people" to the res.json when the URL is directed to /download - the whole of the "people" array is printed out to Browser.

});

app.get('/download', function(req, res) {
   res.download(path.join(__dirname, '/downloads/Mountain-People.jpg'))
});

app.get('/about.html', function(req, res){
   res.redirect('/about.html');
});

app.post('/subscribe', function(req, res) {
   var name = req.body.name;
   var email = req.body.email;
   console.log(name + " has subscribed with " + email);
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});