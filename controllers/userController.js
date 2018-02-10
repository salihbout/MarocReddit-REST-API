var db  = require('./../models');
var jwt = require('jwt-simple');
var passport  = require('passport');

var config = require('../config/database');

var utils = require('../config/utils');

const userController = {};

userController.post = (req, res) => {
    

    //Validation before adding the user tp db
    if (!req.body.username || !req.body.password) {
        res.json({success: false, msg: 'Please pass username and password.'});
      } else {

    
    const user = new db.User({
        username: req.body.username,
        password: req.body.password,
        email:    req.body.email,
        isSubscribed : req.body.isSubscribed

    });


    user.save().then( (newUser) => {
      console.log('adding a nes user ....')
        return res.status(200).json({
            success:true,
            data:newUser,
        });
    }).catch( (err) => {
        return res.status(500).json({
            success:false, msg: 'Username already exists Or something went wrong !!', err :err
        });
    });
}

}

require('../config/passport')(passport);

userController.authenticate = (req, res) => {
    db.User.findOne({
        username: req.body.username
      }, function(err, user) {
        if (err) throw err;
     
        if (!user) {
          res.send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          // check if password matches
          user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
              // if user is found and password is right create a token
              var token = jwt.encode(user, config.secret);
              // return the information including token as JSON
              res.json({success: true, token: 'JWT ' + token});
            } else {
              res.send({success: false, msg: 'Authentication failed. Wrong password.'});
            }
          });
        }
      });
}



userController.VerifyAuth = function(req, res, next){
  var token = utils.getToken(req.headers);
  if (token && typeof token ==! 'undefined') {
      
    var decoded = jwt.decode(token, config.secret);
    console.log(token);
    db.User.findOne({
      username: decoded.username
    }, function(err, user) {
        if (err) throw err;
 
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found. try to log in !'});
        } else {
          req.user = user;
        }
    });

    next();
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
}

module.exports = userController;