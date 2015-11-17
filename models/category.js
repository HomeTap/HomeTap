var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accountSchema = new Schema({
  Categories: String
});

var Category = mongoose.model('Category', accountSchema);

module.exports = Category;
