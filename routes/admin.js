var express = require('express'),
    mongoose = require('mongoose');

var router = express.Router();

var Beer = require('../models/beer');

router.get('/beers', function(req, res) {
  res.render('adminBeersPage');
});

router.post('/beers', function(req, res) {
  var input = req.body;
  new Beer.save(input);
  res.render('adminBeersPage');
});

router.put('/beers/:id', function(req,res) {
  var input = req.body;

  Beer.find({_id: req.params.id}, function(err, beer) {
    // for attribute in input
      // check if it is different that the existing resource
      // change all elements that are different but don't change things that are not
  });
  res.render('adminBeersPage');
});

router.delete('/beers/:id', function(req, res) {
  Beer.find({_id: req.params.id}, function(err, beer) {
    if(err) throw err;
    beer.remove();
    res.render('adminBeersPage');
  });
});

router.get('/home', function(req, res) {
  res.render('adminHomePage');
});

router.post('/home/:id', function(req, res) {
  User.find({_id: req.params.id}, function(err, order){
    if(err) throw err;
    order.remove();
    res.render('adminHomePage');
  });
});

module.exports = router;
