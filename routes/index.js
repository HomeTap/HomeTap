var express = require('express');
var passport = require('passport');

var Account = require('../models/account');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('index', { title: 'HomeTap', user: req.user });
});

router.get('/login', function (req, res) {
  if (req.user) res.redirect('/');
  else res.render('login');
});

// router.post('/login', passport.authenticate('local'), function (req, res) {
//   res.redirect('/');
// });

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) return next(err);
    if (!user) {
      console.log('Unauthorized');
      return res.redirect('/login', { message: 'Login unsuccessful' });
    }
    req.login(user, function (err) {
      if (err) return next(err);
      return res.redirect('/')
    });
  })(req, res, next);
});

router.get('/register', function (req, res) {
  if (req.user) res.redirect('/');
  else res.render('register');
});

router.post('/register', function (req, res) {
  Account.register(new Account({ username: req.body.username }), req.body.password, function (error, account) {
    if (error) return res.render('register', { message: 'The requested User Name is not available' });
    console.log('new Account: ', new Account({ username: req.body.username }));
    console.log('new account created: ', account);
    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
});

router.get('logout', function (req, res) {
  if (req.user) req.logout();
  res.redirect('/');
});

module.exports = router;
