var express = require('express');
var router = express.Router();

var Category = require('../models/category');

router.get('/beers', function (req, res){
  Category.find({}, function(err, categories){
      Beer.find({}, function(err, beers) {
        if(err) throw err;
        res.render('user_lib', {cats: categories, categorylist: categories, beerlist: beers});
      });
    });
});

module.exports = router;
