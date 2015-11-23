var express = require('express');
var passport = require('passport');

var Account = require('../models/account');
var User = require('../models/user');
var router = express.Router();

router.get('/', function (req, res) {
  if (req.user) {
    User.findOne({ userIdString: req.user._id }, function(error, result) {
      if (error) throw error;
      if (result.isAdmin) return res.redirect('/admin');
      else return res.redirect('/user');
    });
  } else res.render('index', { title: 'HomeTap', user: req.user });
});

router.get('/login', function (req, res) {
  if (req.user) {
    User.findOne({ userIdString: req.user._id }, function(error, result) {
      if (error) throw error;
      if (result.isAdmin) return res.redirect('/admin');
      else return res.redirect('/user');
    });
  } else res.render('login');
});

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (error, user, info) {
    if (error) return next(error);
    if (!user) return res.render('login', { message: info.message });
    req.login(user, function (error) {
      if (error) return next(error);
      User.findOne({ userIdString: req.user._id }, function(error, result) {
        if (error) throw error;
        if (result.isAdmin) return res.redirect('/admin');
        else return res.redirect('/user');
      });
    });
  })(req, res, next);
});

router.get('/register', function (req, res) {
  if (req.user) {
    User.findOne({ userIdString: req.user._id }, function(error, result) {
      if (error) throw error;
      if (result.isAdmin) return res.redirect('/admin');
      else return res.redirect('/user');
    });
  } else res.render('register');
});

router.post('/register', function (req, res) {
  Account.register(new Account({ username: req.body.username }), req.body.password, function (error) {
    if (error) return res.render('register', { message: error.message });
    passport.authenticate('local')(req, res, function () {
      var newUser = new User({
        screenName: req.body.screenName,
        isAdmin: false,
        queue: [],
        favorites: [],
        subscription: req.body.subscription,
        userIdString: req.user._id.toString()
      });
      newUser.save(function(error) {
        if (error) throw error;
        res.redirect('/user');
      });
    });
  });
});

router.get('/logout', function (req, res) {
  if (req.user) req.logout();
  res.redirect('/');
});

module.exports = router;
