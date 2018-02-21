var express = require('express');
var passport = require('passport');
var config = require('./config/database');

//Controllers imports
var basicController = require('./controllers/basicController.js');
var userController = require('./controllers/userController.js');
var postController = require('./controllers/postController.js');
var commentController = require('./controllers/commentController.js');
var upvoteController = require('./controllers/upvoteController.js');
var roomController = require('./controllers/roomController.js');
var messageController = require('./controllers/messageController.js');
var topicController = require('./controllers/topicController.js');



var routes = express();


// Basic Routes
routes.get('/', basicController.get);


// User Routes
routes.post('/signup', userController.post);
routes.post('/authenticate', userController.authenticate);
routes.get('/user/:id', userController.getUser)



// Post Routes
routes.post('/post',userController.VerifyAuth,passport.authenticate('jwt', { session: false}), postController.post);
routes.get('/posts', postController.getAll);
routes.get('/post/:id', postController.getPost);

//Topic Routes
routes.post('/topic', topicController.postTopic)
routes.get('/topic', topicController.getTopics)
routes.get('/topic/:id', topicController.getTopic)

//Upvote Routes
routes.post('/vote', upvoteController.upvotePost);
routes.get('/vote', upvoteController.getUpvotes);
routes.get('/vote/:id', upvoteController.getUpvote);


// Comment Routes
routes.post('/comment',userController.VerifyAuth,passport.authenticate('jwt', { session: false}), commentController.post);

//Room Routes
routes.post('/room', roomController.postRoom)
routes.get('/chat', roomController.getRooms)
routes.get('/chat/:id', roomController.getRoom)


//Messages Routes
routes.post('/message', messageController.postMessage)
routes.get('/message/:id', messageController.getMessage)



module.exports =  routes;