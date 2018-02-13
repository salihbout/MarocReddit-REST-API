var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var routes = require('./routes.js');
var config = require('./config/database');


const app = express();




mongoose.connect(config.database, function(){
    console.log('Connecting to db....');
});


//Middlewares
app.use(bodyParser.json()); // get our request parameters
app.use(morgan('dev')); // log to console
app.use(passport.initialize());  // Use the passport package in our application



app.use('/api', routes);

// Start the server
app.listen(3000);




module.exports = app;