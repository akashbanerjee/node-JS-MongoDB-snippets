var mongoose = require('mongoose'),
    assert = require('assert');

var Promotions = require('./models/promotions');

var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function()  {
  console.log("Connected correctly to the server");
//create method to create a new promotion
  Promotions.create({
    name: 'Weekend Grand Buffet',
    image: 'images/buffet.png',
    label : 'New',
    price: '19.99',
    description: 'Featuring',
    
  }, function(err, promotion)  {
      if(err) throw err;

      console.log('promotion created');
      console.log(promotion);
      var id = promotion._id;
      //timeout since created and updated fields will be different
      setTimeout(function() {
        Promotions.findByIdAndUpdate(id, {//this makes the statement
                $set: {
                  description: 'Updated Test'
                }
        }, {
          new: true//return updated new promotion else perform find function and return existing entry from db
        })
        .exec(function(err, promotion) {//.exec executes it
          if(err) throw err;
          console.log('Updated promotion');
          console.log(promotion);

         
           db.collection('promotions').drop(function(result) {
             db.close();
            });
          });
       
      }, 3000);
  });
});