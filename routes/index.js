var express = require('express');
var passport = require('passport');

var Account = require('../models/account');
var User = require('../models/user');
var Category = require('../models/category');
var Beer = require('../models/beer');
var router = express.Router();

router.get('/', function (req, res) {
  if (req.user) {
    var categories = {};
    User.findOne({ userId: req.user._id }, function(error, result) {
      if (error) console.error(error);
      result.username = req.user.username;

      Category.find({}, function(error, results) {
        if (error) console.error(error);
        results.forEach(function(element) {
          categories[element._doc._id.toString()] = element._doc.category;
        });
        console.log('categories: ', categories);

        Beer.find({ _id: { $in: result.queue } }, function(error, results) {
          if (error) console.error(error);
          results.forEach(function(element, index) {
            console.log('element: ', element);
            // console.log('Object.keys(element): ', Object.keys(element));
            console.log('element._doc: ', element._doc);
            // console.log('results[index]: ', results[index]);
            // console.log('element._id: ', element._id.toString());
            // console.log('element._doc._id: ', element._doc._id.toString());
            // console.log('element._id: ', typeof element._id.toString());
            // console.log('element._doc._id: ', typeof element._doc._id.toString());
            // console.log('categories[element._id]: ', categories[element._id.toString()]);
            // console.log('categories[element._doc._id]: ', categories[element._doc._id.toString()]);
            // results[index].category = categories[element._id];
          });
          // console.log('results: ', results);
          result.queue = results;

          Beer.find({ _id: { $in: result.favorites } }, function(error, results) {
            if (error) console.error(error);
            result.favorites = results;

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
    if (!user) return res.render('login', { message: info.message });
    req.login(user, function (err) {
      if (err) return next(err);
      return res.redirect('/');
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
