var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Leader = require('../models/leadership');
var Verify = require('./verify');

var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());
leaderRouter.route('/')
  .get(Verify.verifyOrdinaryUser, function(req, res, next){
    Leader.find({}, function(err, leader) {
          if(err) throw err;
          res.json(leader);//response method in json format

        });
  })
  .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
      Leader.create(req.body, function(err, leader) {
              if(err) throw err;

              console.log('leader Created');
              var id = leader._id;
              res.writeHead(200, {
                'Content-Type': 'text/plain'
              });

              res.end('Added the leader with id: '+ id);//reply back to client
            });

  })
  .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
      Leader.remove({}, function(err, resp) {
              if(err) throw err;
              res.json(resp);
              
            });

  });

leaderRouter.route('/:leaderId')
  .get(Verify.verifyOrdinaryUser, function(req, res, next){
    Leader.findById(req.params.leaderId, function(err, leader)  {
          if(err) throw err;

          res.json(leader);//passing info to client

        });

  })
  .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
      Leader.findByIdAndUpdate(req.params.leaderId, {
              $set: req.body
            }, {
                new:true//callback function returns updated leader value
            }, function(err, leader){
              if(err) throw err;

              res.json(leader);
            });

  })
  .delete(Verify.verifyOrdinaryUser,  Verify.verifyAdmin, function(req, res, next){
      Leader.findByIdAndRemove(req.params.leaderId,
             function (err, resp)
             {      
               if (err) throw err;
                res.json(resp);
            });

  });

module.exports = leaderRouter;