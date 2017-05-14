var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favoriteSchema = new Schema({

   postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' 
  },
  dishes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dish' }]
},{
  timestamps: true
});


//create a model
var Favourites = mongoose.model('Favourites', favoriteSchema);

module.exports = Favourites;