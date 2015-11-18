var express = require('express'),
    mongoose = require('mongoose');

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
    if(err)
    console.log(err);
  });
  res.send('hey');
  // res.render('admin_lib');
});

router.put('/beers/:id', function(req,res) {
  var input = req.body;

  Beer.find({_id: req.params.id}, function(err, beer) {
    // for attribute in input
      // check if it is different that the existing resource
      // change all elements that are different but don't change things that are not
  });
  res.render('admin_lib');
});

router.delete('/beers/:id', function(req, res) {
  Beer.find({_id: req.params.id}, function(err, beer) {
    if(err) throw err;
    beer.remove();
    res.render('admin_lib');
  });
});

router.get('/home', function(req, res) {
  User.find({}, function(err, users){
  if(err) throw err;
    // var NextBeerName = queue[0];
  res.render('admin_home', {userList: users});
  });
});

router.post('/home/:id', function(req, res) {
  User.find({_id: req.params.id}, function(err, queue){
  if(err) throw err;
    // var NextBeerName = queue[0];
  res.render('admin_home');
  }); 
});

module.exports = router;
