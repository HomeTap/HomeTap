var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accountSchema = new Schema({
  name: String,
  categoryId: Number,
  description: String,
  stars: Number
});

var Beer = mongoose.model('Beer', accountSchema);

module.exports = Beer;
