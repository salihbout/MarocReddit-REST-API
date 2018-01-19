var  express = require('express');
var passport = require('passport');
var config = require('./config/database');

//Controllers imports
var basicController = require('./controllers/basicController.js');
var userController = require('./controllers/userController.js');
var postController = require('./controllers/postController.js');
var commentController = require('./controllers/commentController.js');
var upvoteController = require('./controllers/upvoteController.js');



var routes = express();


// Basic Routes
routes.get('/', basicController.get);


// User Routes
routes.post('/signup', userController.post);
routes.post('/authenticate', userController.authenticate);



// Post Routes
routes.post('/post',userController.VerifyAuth,passport.authenticate('jwt', { session: false}), postController.post);
routes.get('/posts', postController.getAll);
routes.get('/post/:id', postController.getPost);


//Upvote Routes
routes.post('/vote', upvoteController.upvotePost);


// Comment Routes
routes.post('/comment', commentController.post);



module.exports =  routes;