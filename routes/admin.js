var express = require('express');

var router = express.Router();
var Beer = require('../models/beer');
var Category = require('../models/categories');
var User = require('../models/user');

router.get('/beers', function(req, res) {
Category.find({}, function(err, categories){
    Beer.find({}, function(err, beers) {
      if(err) throw err;
      res.render('admin_lib', {cats: categories, categorylist: categories, beerlist: beers});
    });

  });
});

router.post('/beers', function(req, res) {
  var newBeer = new Beer({
    name: req.body.name,
    categoryId: req.body.categoryId,
    description: req.body.description,
    stars: req.body.stars
  });
  newBeer.save(function(err) {
    if(err) throw err;
    Category.find({}, function(err, categories){
    Beer.find({}, function(err, beers) {
      if(err) throw err;
      res.render('admin_lib', {cats: categories, categorylist: categories, beerlist: beers});
    });
  });
  });
});

//potentially edit beers

router.delete('/beers/:id', function(req, res) {
  Beer.find({_id: req.params.id}, function(err, beer) {
    if(err) throw err;
    beer.remove();
    res.render('admin_lib');
  });
});

router.get('/home', function(req, res) {
  User.find({isAdmin: false}, function(err, users) {
    if(err) throw err;
    res.render('admin_home', {users: users});
  });
});

router.post('/home/:id', function(req, res) {
  User.find({_id: req.params.id}, function(err, order) {
    if(err) throw err;
    order.remove();
    res.render('admin_home');
  });
});

module.exports = router;
