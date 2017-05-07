var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config.js');

exports.getToken = function(user) {
  return jwt.sign(user, config.secretKey, {//generate signed token
    expiresIn: 3600
  });
};

exports.verifyOrdinaryUser = function(req, res, next) {

  //check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || 
              req.headers['x-access-token'];

  //decode token
  if(token) {

    //verifies secret key and checks expiry
    jwt.verify(token, config.secretKey, function(err, decoded)  {
      if(err) {
        var err = new Error('You are not authenticated');
        err.status = 401;
        return next(err);
      } else {
        //if everything is good, save request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
      //if no token then return error
      var err = new Error("No token provided");
      err.status = 403;
      return next(err);
  }
};

exports.verifyAdmin = function(req, res, next)  {

  var token = req.body.token || req.query.token || 
              req.headers['x-access-token'];

  var isAdmin = req.decoded._doc.admin;

  if(token && isAdmin)  {
    
    jwt.verify(token, config.secretKey, function(err, decoded)  {
        if(err) {
          var err = new Error('You are not authenticated');
          err.status = 401;
          return next(err);
        } else {
          //if everything is good, save request for use in other routes
          req.decoded = decoded;
          next();
        }
      });


  }else {

    var err = new Error("No admin rights");
    err.status = 403;
    return next(err);

  }

};