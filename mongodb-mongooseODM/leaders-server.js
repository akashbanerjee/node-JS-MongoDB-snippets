var mongoose = require('mongoose'),
    assert = require('assert');

var Leaders = require('./models/leaders');

var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function()  {
  console.log("Connected correctly to the server");
//create method to create a new leader
  Leaders.create({
    name: 'Peter Pan',
    image: 'images/alberto.png',
    designation : 'Chief Epicurious Officer',
    abbr: 'CEO',
    description: 'Our CEO, Peter, . . .',
    
  }, function(err, leader)  {
      if(err) throw err;

      console.log('leader created');
      console.log(leader);
      var id = leader._id;
      //timeout since created and updated fields will be different
      setTimeout(function() {
        Leaders.findByIdAndUpdate(id, {//this makes the statement
                $set: {
                  description: 'Updated Desciption'
                }
        }, {
          new: true//return updated new leader else perform find function and return existing entry from db
        })
        .exec(function(err, leader) {//.exec executes it
          if(err) throw err;
          console.log('Updated leader');
          console.log(leader);

         
           db.collection('leaders').drop(function(result) {
             db.close();
            });
          });
       
      }, 3000);
  });
});