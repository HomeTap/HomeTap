var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Category = require('../models/category');
var Beer = require('../models/beer');

router.get('/', function (req, res) {
  var categories = {};
  User.findOne({ userIdString: req.user._id }, function(error, result) {
    if (error) throw error;
    result = result._doc;
    result.username = req.user.username;

    Category.find({}, function(error, results) {
      if (error) throw error;
      results.forEach(function(element) {
        categories[element._doc._id.toString()] = element._doc.category;
      });

      Beer.find({ _id: { $in: result.queue } }, function(error, results) {
        if (error) throw error;
        results.forEach(function(element, index) {
          results[index].category = categories[element._doc.categoryIdString];
          results[index]._doc.category = categories[element._doc.categoryIdString];
        });
        result.queue = results;

        Beer.find({ _id: { $in: result.favorites } }, function(error, results) {
          if (error) throw error;
          results.forEach(function(element, index) {
            results[index].category = categories[element._doc.categoryIdString];
            results[index]._doc.category = categories[element._doc.categoryIdString];
          });
          result.favorites = results;

          console.log('user: ', result);
          res.render('user_home', { title: 'HomeTap', user: result });
        });
      });
    });
  });
});

router.get('/beers', function (req, res){
  User.findOne({userIdString: req.user._id}).lean().exec(function(error, result) {
    var favs  = result.favorites;
    var categories = {};

    Category.find({}, function(error, results){
      var firstCategoryId = results[0]._id;
      results.forEach(function(element) {
        categories[element._doc._id.toString()] = element._doc.category;
      });

      if(error) throw error;
      Beer.find({categoryId: firstCategoryId}).lean().exec(function(error, beers) {
        var newBeers = beers.map(function(beer) {
          beer.favorite = favs._id;
          return beer;
        });

        if(error) throw error;
        console.log(categories);
        res.render('user_lib', {categorylist: categories, beerlist: newBeers});
      });
    });
  });
});

router.get('/beers/category/:id', function(req, res) {
  User.findOne({userIdString: req.user._id}).lean().exec(function(error, result) {
    var favs  = result.favorites;
    var categories = {};

    Category.find({}, function(error, results){
      results.forEach(function(element) {
        categories[element._doc._id.toString()] = element._doc.category;
      });

      if(error) throw error;
      Beer.find({categoryId: req.params.id}).lean().exec(function(error, beers) {
        var newBeers = beers.map(function(beer) {
          beer.favorite = favs._id;
          return beer;
        });

        if(error) throw error;
        console.log(categories);
        res.render('user_lib', {categorylist: categories, beerlist: newBeers});
      });
    });
  });
});

router.put('/beers/favorite/:id', function(req, res) {
  var categories = {};

  Category.find({}, function(error, results){
    results.forEach(function(element) {
      categories[element._doc._id.toString()] = element._doc.category;
    });

    if(error) throw error;
    Beer.find({categoryId: req.params.id}, function(error, beers) {
      if(error) throw error;
      console.log(categories);
      res.render('user_lib', {categorylist: categories, beerlist: beers});
    });
  });
});

module.exports = router;
