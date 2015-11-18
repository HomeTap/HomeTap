var express = require('express'),
    mongoose = require('mongoose');

var router = express.Router();

var Beer = require('../models/beer');
var User = require('../models/user');

router.get('/beers', function(req, res) {
  res.render('admin_lib');
});

router.post('/beers', function(req, res) {
  var input = req.body;
  new Beer.save(input);
  res.render('admin_lib');
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

router.get('/user', function(req, res) {
  User.find({}, function(err, users){
  if(err) throw err;
    // var NextBeerName = queue[0];
  res.render('admin_home', {Users});
});

router.post('/user/:id', function(req, res) {
  User.find({_id: req.params.id}, function(err, queue){
  if(err) throw err;
    // var NextBeerName = queue[0];
  res.render('admin_home');
}); 



});

module.exports = router;
