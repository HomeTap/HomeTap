var express = require('express');

var User = require('../models/user');
var Category = require('../models/category');
var Beer = require('../models/beer');
var router = express.Router();

function renderAdminLibrary(req, res, def, categoryId) {
  var categories = {};

  Category.find({}, function(error, results) {
    if (error) throw error;
    var category = results[0]._id;
    if (!def) category = req.params.id || categoryId;

    results.forEach(function(element) {
      categories[element._doc._id.toString()] = element._doc.category;
    });

    Beer.find({ categoryId: category }).lean().exec(function(error, results) {
      if (error) throw error;

      res.render('admin_lib', { categories: categories, beers: results });
    });
  });
}

router.get('/beers', function(req, res) {
  renderAdminLibrary(req, res, true);
});

router.post('/beers', function(req, res) {
  var newBeer = new Beer({
    name: req.body.name,
    categoryId: req.body.categoryId,
    description: req.body.description,
    stars: req.body.stars,
    categoryIdString: req.body.categoryId.toString()
  });
  newBeer.save(function(error) {
    if (error) throw error;
    renderAdminLibrary(req, res, false, req.body.categoryId);
  });
});

router.delete('/beers/:id', function(req, res) {
  Beer.findByIdAndRemove(req.params.id, function(error) {
    if (error) throw error;
    res.end();
  });
});

router.get('/beers/category/:id', function(req, res) {
  renderAdminLibrary(req, res, false);
});

router.get('/', function(req, res) {
  User.find({ isAdmin: false }).lean().exec(function(error, results) {
    if (error) throw error;
    var usersWithQueueItems = [];
    results.forEach(function(element) {
      if (element.queue.length > 0) usersWithQueueItems.push(element);
    });

    res.render('admin_home', { users: usersWithQueueItems });
  });
});

router.put('/:id', function(req, res) {
  User.findOne({ _id: req.params.id }).lean().exec(function(error, result) {
    if (error) throw error;
    var que = result.queue.map(function(element) {
      return element.toString();
    });
    que.splice(0, 1);
    User.update({ _id: req.params.id }, { $set: { queue: que } }, function(error) {
      if (error) throw error;
      res.end();
    });
  });
});

module.exports = router;
