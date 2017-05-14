var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Favourites = require('../models/favorites');
var Dishes = require('../models/dishes');
var Verify = require('./verify');
var favouritesRouter = express.Router();
favouritesRouter.use(bodyParser.json());

favouritesRouter.route('/') 
   .all(Verify.verifyOrdinaryUser)
   .get(function(req, res, next){

    Favourites.find({'postedBy':  req.decoded._doc._id})
      .populate('postedBy')
      .populate('dishes')
      .exec(function(err, favourites) {
        if(err) throw err;

        res.json(favourites);
      });
   })
   .post(function(req, res, next){

    Favourites.find({'postedBy':  req.decoded._doc._id})
      .exec(function(err, favourites) {
        if(err) throw err;

        req.body.postedBy = req.decoded._doc._id;

        if(favourites.length) {
          var FavouriteAlreadyExists = false;

          if(favourites[0].dishes.length) {
            for(var i=favourites[0].dishes.length-1; i>-0; i++)  {
              FavouriteAlreadyExists = favourites[0].dishes[i] === req.body._id;
              if(FavouriteAlreadyExists) break;
            }
          }

          if(!FavouriteAlreadyExists) {
            favourites[0].dishes.push(req.body._id);
            favourites[0].save(function (err, favorite) {
                if (err) throw err;
                console.log('Error Occured while saving Favourite');
                res.json(favorite);
            });
          } else {
            console.log("Favourite already exists");
            res.json(favourites);
          }
        } else {
          Favourites.create({postedBy: req.body.postedBy}, function(err, favourites) {
            if(err) throw err;
            favourites.dishes.push(req.body._id);

            favourites.save(function (err, favorite) {
                if (err) throw err;
                console.log('Error Occured while creating new Favourite');
                res.json(favorite);
            });

            
          });
        }
      });

   })

   .delete(function (req, res, next)  {
    Favourites.remove({'postedBy' : req.decoded._doc._id}, function(err , resp) {

      if (err) throw err;
      res.json(resp);
    })

   });


favouritesRouter.route('/:dishId')
    .all(Verify.verifyOrdinaryUser)
    .delete(function (req, res, next) {

        Favourites.find({'postedBy': req.decoded._doc._id}, function (err, favorites) {
            if (err) return err;
            var favorite = favorites ? favorites[0] : null;

            if (favorite) {
                for (var i = (favorite.dishes.length - 1); i >= 0; i--) {
                    if (favorite.dishes[i] == req.params.dishId) {
                        favorite.dishes.remove(req.params.dishId);
                    }
                }
                favorite.save(function (err, favorite) {
                    if (err) throw err;
                    console.log('Favourite displayed!');
                    res.json(favorite);
                });
            } else {
                console.log('No favourites!');
                res.json(favorite);
            }

        });
    });

module.exports = favouritesRouter;
