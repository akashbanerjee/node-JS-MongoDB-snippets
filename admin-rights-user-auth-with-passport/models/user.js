var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  username: String,
  password: String,
  admin: {
    type: Boolean,
    default: false//user admin status false when created
  }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);