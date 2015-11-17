var express = require('express');
var app = express();
var routes = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

app.set('views', __dirname + '/views');
app.set('views engine', 'jade');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(logger('dev'));

app.use('/', routes);
app.use('/users', users);
app.use('/admin', admin);

app.use(function(req, res, next) {
  console.error('***** Error: no such route exists *****');
  var err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

//may need to add parameter next if subsequent calls are required
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {title: err.message, error: err});
});

app.listen(3000, function() {
  console.log('Listening on port 3000 ...');
});
