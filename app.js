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
var User = require('./models/user');
var routes = require('./routes/index');
var user = require('./routes/user');
var admin = require('./routes/admin');
var app = express();
var port = process.env.PORT || 3000;
mongoose.connect(dbURI);

// a comment for heroku 

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('port', port);

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

function ensureAuthenticatedUser (req, res, next) {
  if (req.isAuthenticated()) {
    return User.findOne({userIdString: req.user._id}, function(error, result) {
      if (error) throw error;
      if (!result.isAdmin) {
        return next();
      }
    });
  }
  var err = new Error('Unauthorized');
  err.status = 401;
  next(err);
}

function ensureAuthenticatedAdmin (req, res, next) {
  if (req.isAuthenticated()) {
    return User.findOne({userIdString: req.user._id}, function(error, result) {
      if (error) throw error;
      if (result.isAdmin) { return next(); }
    });
  }
  var err = new Error('Unauthorized');
  err.status = 401;
  next(err);
}

app.use('/', routes);
app.use('/user', ensureAuthenticatedUser, user);
app.use('/admin', ensureAuthenticatedAdmin, admin);

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

app.listen(port, function() {
  console.log('Listening on port 3000 ...');
});
