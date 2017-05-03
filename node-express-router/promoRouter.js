var express = require('express');


var promoRouter = express.Router();

promoRouter.route('/')
  .all(function(req, res, next) {

    res.writeHead(200, {'Content-Type': 'text/plain'});

    next();
  })
  .get(function(req, res, next){
  res.end('Will send all the promotions to you');

  })
  .post(function(req, res, next){
  res.end('Will add promo' + req.body.name+ ' with details '+ 
    req.body.description);

  })
  .delete(function(req, res, next){
  res.end('Will delete all promo');

  });

promoRouter.route('/:promoId')
  .all(function(req, res, next) {

    res.writeHead(200, {'Content-Type': 'text/plain'});

    next();
  })
  .get(function(req, res, next){
  res.end('Will send details of the promo: '+ req.params.promoId + 
    ' to you');

  })
  .put(function(req, res, next){
  res.write('Updating the promo: '+ req.params.promoId + '\n');
  res.end('Will update the promo: '+ req.body.name + 
    ' with details: '+ req.body.description);

  })
  .delete(function(req, res, next){
  res.end('Deleting promo: '+ req.params.promoId);

  });

module.exports = promoRouter;