var express = require('express');
var router = express.Router();
var Schema = require('mongoose').Schema;
var ObjectId = Schema.Types.ObjectId;

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

function renderLibrary(req, res, def) {
  User.findOne({userIdString: req.user._id}).lean().exec(function(error, result) {
    var favs  = result.favorites;
    var categories = {};

    Category.find({}, function(error, results){
      var category = results[0]._id;
      if (!def) category = req.params.id;

      results.forEach(function(element) {
        categories[element._doc._id.toString()] = element._doc.category;
      });

      if(error) throw error;
      Beer.find({categoryId: category}).lean().exec(function(error, beers) {
        var newBeers = beers.map(function(beer) {
          beer.favorite = favs._id;
          return beer;
        });

        if(error) throw error;
        res.render('user_lib', {categorylist: categories, beerlist: newBeers});
      });
    });
  });
}

router.get('/beers', function (req, res){
  renderLibrary(req, res, true);
});

router.get('/beers/category/:id', function(req, res) {
  renderLibrary(req, res, false);
});

router.put('/beers/favorite/:id', function(req, res) {
  User.find({userIdString: req.user._id}, function(error, results) {
    console.log('user: ', results);
    var favs = results.favorites;
    if (req.params.id in favs) {
      favs = favs.splice(indexOf(req.params.id), 1);
      User.update({userIdString: req.user._id}, {$set: {favorites: favs}}, function(error, results) {
        if (error) throw error;
        renderLibrary(req, res, true);
      });
    } else {
      favs.push(ObjectId(req.params.id))
      User.update({userIdString: req.user._id}, {$set: {favorites: favs}}, function(error, results) {
        if (error) throw error;
        renderLibrary(req, res, true);
      });
    }
  });
});

router.put('/beers/queue/:id', function(req, res) {
  // adjusting user's queue
  renderLibrary(req, res, true); // adjust so that we render a view for the currently selected category
});

module.exports = router;
