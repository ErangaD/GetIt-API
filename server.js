//server.js
//first we import our dependencies...
console.log("begining of the server");
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//and create our instances
var app = express();

//Socket for Messaging part
//getting the server instance
var http = require('http').Server(app);
require('./routes/socketHandler').listen(http)

var registration= require('./routes/registration');
var authentication = require('./routes/authentication');
var profile = require('./routes/userProfile');
var admin = require('./routes/adminRoutes');
//var registration = express.Router();

//set our port to either a predetermined port number if you have set it up, or 3001
var port = process.env.API_PORT || 3001;


//db config
//mongoose.connect('mongodb://getit:1994@ds139761.mlab.com:39761/getitlk');
mongoose.connect('mongodb://localhost/po');

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

//Use our registration configuration when we call /api
app.use('/api', registration);
*/
app.use('/api/authentication',authentication);
app.use('/api/user',profile);
app.use('/api/admin',admin);
app.use('/api', registration);
//starts the server and listens for requests
http.listen(port, function() {
    console.log(`api running  on port ${port}`);
});
module.exports = express;