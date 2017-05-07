var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Promo = require('../models/promotions');
var Verify = require('./verify');
var promoRouter = express.Router();
promoRouter.use(bodyParser.json());
promoRouter.route('/')
  .get(Verify.verifyOrdinaryUser, function(req, res, next){
    Promo.find({}, function(err, promo) {
        if(err) throw err;
        res.json(promo);//response method in json format

      });

  })
  .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
     Promo.create(req.body, function(err, promo) {
          if(err) throw err;

          console.log('promo Created');
          var id = promo._id;
          res.writeHead(200, {
            'Content-Type': 'text/plain'
          });

          res.end('Added the promo with id: '+ id);//reply back to client
        });

  })
  .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
      Promo.remove({}, function(err, resp) {
          if(err) throw err;
          res.json(resp);
          
        });

  });

promoRouter.route('/:promoId')
  .get(Verify.verifyOrdinaryUser, function(req, res, next){
    Promo.findById(req.params.promoId, function(err, promo)  {
        if(err) throw err;

        res.json(promo);//passing info to client

      });

  })
  .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin,  function(req, res, next){
      Promo.findByIdAndUpdate(req.params.promoId, {
          $set: req.body
        }, {
            new:true//callback function returns updated promo value
        }, function(err, promo){
          if(err) throw err;

          res.json(promo);
        });

  })
  .delete(Verify.verifyOrdinaryUser,  Verify.verifyAdmin, function(req, res, next){
      Promo.findByIdAndRemove(req.params.promoId,
         function (err, resp)
         {      
           if (err) throw err;
            res.json(resp);
        });

  });

module.exports = promoRouter;