var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var dbURI = require('./config').dbURI;
var Account = require('./models/account');
var routes = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');
var app = express();

mongoose.connect(dbURI);

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  // res.redirect('/');
  var err = new Error('Unauthorized');
  err.status = 401;
  next(err);
}

app.use('/', routes);
app.use('/users', ensureAuthenticated, users);
app.use('/admin', ensureAuthenticated, admin);

app.use(function(req, res, next) {
  var err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {title: err.message, error: err});
  console.log(next);
});

app.listen(3000, function() {
  console.log('Listening on port 3000 ...');
});
