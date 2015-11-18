var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accountSchema = new Schema({
  username: String,
  screenName: String,
  isAdmin: Boolean,
  queue: Array,
  favorites: Array,
  subscription: String
});

var User = mongoose.model('User', accountSchema);

module.exports = User;
