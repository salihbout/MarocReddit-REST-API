var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var routes = require('./routes.js');
var config = require('./config/database');




mongoose.connect(config.database, function(){
    console.log('Connecting to db....');
});

const app = express();

//Middlewares
app.use(bodyParser.json()); // get our request parameters
app.use(morgan('dev')); // log to console
app.use(passport.initialize());  // Use the passport package in our application



app.use('/api', routes);

// Start the server
var server = app.listen(3000);

var io = require('socket.io').listen(server);
global.io = io;

io.on('connection', function (socket) {
    console.log(socket.id)
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
      console.log(data);
    }); 
    
  });

module.exports = app;