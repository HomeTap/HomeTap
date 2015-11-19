var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var beerSchema = new Schema({
  name: String,
  categoryId: ObjectId,
  description: String,
  stars: Number,
  categoryIdString: String
});

var Beer = mongoose.model('Beer', beerSchema);

module.exports = Beer;
