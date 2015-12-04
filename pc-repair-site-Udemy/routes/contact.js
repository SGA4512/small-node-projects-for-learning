var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('contact', { title: 'Contact' });
});

router.post('/send', function(req, res) {
    // The below piece of code is directly from https://github.com/andris9/Nodemailer
    // create reusable transporter object using SMTP transport
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'christmas2014dec@gmail.com',
            pass: ''  // I am keeping the password field empty now, but before sending a contact form, I have to put the password of 'christmas2014dec@gmail.com' here.
        }
    });
    // Sending contact form information from this app to 'rohanpaul2@gmail.com' only worked after I set the Access for less secure apps in the relevant google account (christmas2014dec@gmail.com in this case), setting it to "Turn On" / "Enable" at <https://www.google.com/settings/security/lesssecureapps>. Before enabling this Gmail was sending me a "Sign-in attempt prevented" email after submitting the form. Similar issue was faced by others as well, see - https://stackoverflow.com/questions/26196467/sending-email-via-node-js-using-nodemailer-is-not-working


    // The below piece of code is directly from https://github.com/andris9/Nodemailer
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'Rohan Paul <christmas2014dec@gmail.com>', // sender address
        to: 'rohanpaul2@gmail.com', // list of receivers
        subject: 'Website Submission', // Subject line
        text: 'You have a submission with the following details.. Name: '+req.body.name + 'Email: '+req.body.email + 'Message: '+req.body.message, // plaintext body
        html: '<p>You have a submission with the following details.. </p><ul><li>Name: '+req.body.name + '</li><li>Email: '+req.body.email + '</li><li>Message: '+req.body.message+'</li></ul>' // html body
    };
    // The below piece of code is directly from https://github.com/andris9/Nodemailer
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
            res.redirect('/');
        }
        console.log('Message sent: ' + info.response);
        res.redirect('/');
    });

});

module.exports = router;