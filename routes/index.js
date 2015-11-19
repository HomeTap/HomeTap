var express = require('express');
var passport = require('passport');

var Account = require('../models/account');
var User = require('../models/user');
var Category = require('../models/categories');
var Beer = require('../models/beer');
var router = express.Router();

router.get('/', function (req, res) {
  if (req.user) {
    var categories = {};
    User.findOne({ userId: req.user._id }, function(error, result) {
      if (error) console.error(error);
      result = result._doc;
      result.username = req.user.username;

      Category.find({}, function(error, results) {
        if (error) console.error(error);
        results.forEach(function(element) {
          categories[element._doc._id.toString()] = element._doc.category;
        });

        Beer.find({ _id: { $in: result.queue } }, function(error, results) {
          if (error) console.error(error);
          results.forEach(function(element, index) {
            results[index].category = categories[element._doc.categoryIdString];
            results[index]._doc.category = categories[element._doc.categoryIdString];
          });
          result.queue = results;

          Beer.find({ _id: { $in: result.favorites } }, function(error, results) {
            if (error) console.error(error);
            results.forEach(function(element, index) {
              results[index].category = categories[element._doc.categoryIdString];
              results[index]._doc.category = categories[element._doc.categoryIdString];
            });
            result.favorites = results;

            console.log('user: ', result);
            res.render('index', { title: 'HomeTap', user: result });
          });
        });
      });
    });
  } else res.render('index', { title: 'HomeTap', user: req.user });
});

router.get('/login', function (req, res) {
  if (req.user) res.redirect('/');
  else res.render('login');
});

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) return next(err);
    if (!user) return res.
      render('login', { message: info.message });
    req.login(user, function (err) {
      if (err) return next(err);
      User.findOne({ userId: req.user._id }, function(error, result) {
        if (error) console.error(error);
        if (result.isAdmin) return res.redirect('/admin/home');
        else return res.redirect('/');
      });
    });
  })(req, res, next);
});

router.get('/register', function (req, res) {
  if (req.user) res.redirect('/');
  else res.render('register');
});

router.post('/register', function (req, res) {
  Account.register(new Account({ username: req.body.username }), req.body.password, function (error) {
    if (error) return res.render('register', { message: error.message });
    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
});

router.get('/logout', function (req, res) {
  if (req.user) req.logout();
  res.redirect('/');
});

module.exports = router;
