var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
  Category: String
});

var Category = mongoose.model('Category', categorySchema);

module.exports = Category;
