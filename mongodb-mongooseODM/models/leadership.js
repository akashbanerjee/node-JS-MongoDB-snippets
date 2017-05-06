var mongoose = require('mongoose');
var Schema = mongoose.Schema;



//create a Schema
var leaderSchema = new Schema({

  name:{
    type: String,
    required: true,
    unique: true
  },
  image:{
    type:String
  },
  designation: {
    type:String,
    required: true
  },
  abbr: {
    type:String
  },
  description: {
    type: String,
    required: true
  }
},  {
  timestamps: true
});

//create a model
var Leaders = mongoose.model('Leader', leaderSchema);

module.exports = Leaders;