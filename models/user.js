var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var userSchema = new Schema({
  userId: ObjectId,
  screenName: String,
  isAdmin: Boolean,
  queue: [ObjectId],
  favorites: [ObjectId],
  subscription: String,
  userIdString: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;
