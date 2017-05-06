var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes');

var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function()  {
  console.log("Connected correctly to the server");
//create method to create a new dish
  Dishes.create({
    name: 'Pizza',
    image: 'images/pizza.png',
    category : 'mains',
    label : 'Hot',
    price: '4.99',
    description: 'Test',
    comments: [
      {
        rating:3,
        comment: 'This is insane',
        author: 'Matt Daemon'
      }
    ]
  }, function(err, dish)  {
      if(err) throw err;

      console.log('Dish created');
      console.log(dish);
      var id = dish._id;
      //timeout since created and updated fields will be different
      setTimeout(function() {
        Dishes.findByIdAndUpdate(id, {//this makes the statement
                $set: {
                  description: 'Updated Test'
                }
        }, {
          new: true//return updated new dish else perform find function and return existing entry from db
        })
        .exec(function(err, dish) {//.exec executes it
          if(err) throw err;
          console.log('Updated Dish');
          console.log(dish);

          dish.comments.push({
            rating:5,
            comment: 'Too good',
            author: 'Leo'
          });

          dish.save(function(err, dish) {
            console.log('Updated Comments');
            console.log(dish);
         
           db.collection('dishes').drop(function(result) {
             db.close();
            });
          });
        });
      }, 3000);
  });
});