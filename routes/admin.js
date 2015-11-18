var express = require('express'),
    mongoose = require('mongoose');

var router = express.Router();
var db = mongoose.createConnection(require('../config').dbURI);
var Beer = require('../models/beer');

// var Beer = require('../models/beer');
var User = require('../models/user');

router.get('/beers', function(req, res) {
    Beer.find({}, function(err, beers) {
      if(err) throw err;
      res.render('admin_lib', {beerlist: beers});
    });
});

router.post('/beers', function(req, res) {
  var input = req.body;
  res.send(input);
  // new Beer.save(input);
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
  res.render('admin_home');
});

router.post('/home/:id', function(req, res) {
  User.find({_id: req.params.id}, function(err, order){
    if(err) throw err;
    order.remove();
    res.render('admin_home');
  });
});

module.exports = router;
