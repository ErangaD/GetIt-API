//server.js
var User = require('./model/User');

//first we import our dependencies...
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//and create our instances
var app = express();
var router= require('./routes/routes');
//var router = express.Router();

//set our port to either a predetermined port number if you have set it up, or 3001
var port = process.env.API_PORT || 3001;

//db config
mongoose.connect('mongodb://localhost/getIt_rest');

//now we should configure the API to use bodyParser and look for
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent comments
    res.setHeader('Cache-Control', 'no-cache');
    next();
});
/*
//now we can set the route path & initialize the API
router.get('/', function(req, res) {
    res.json({ message: 'API Initialized!'});
});

//route for buyer registrations
router.route('/buyerRegistration')
    .post(function (req,res) {
        console.log("Me");
        var name=req.body.name;
        var email=req.body.email;
        var password = req.body.password;
        var userName = req.body.userName;
        var tpNumber = req.body.tpNumber;
        var newUser = new User({
            name: name,
            email: email,
            password: password,
            userName: userName,
            telNo: tpNumber,
            userType:false
        });

        User.createUser(newUser,function (err,user) {
            if(err) throw err;
            console.log(user);
        });
    });

//Use our router configuration when we call /api
app.use('/api', router);
*/
app.use('/api', router);
//starts the server and listens for requests
app.listen(port, function() {
    console.log(`api running  on port ${port}`);
});
module.exports = express;