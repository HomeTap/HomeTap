var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Category = require('../models/category');
var Beer = require('../models/beer');

function renderUserLibrary(req, res, def) {
  User.findOne({ userIdString: req.user._id }).lean().exec(function(error, result) {
    if (error) throw error;
    var favs = result.favorites.map(function(element) {
      return element.toString();
    });
    var que = result.queue.map(function(element) {
      return element.toString();
    });
    var categories = {};

    Category.find({}, function(error, results) {
      if (error) throw error;
      var category = results[0]._id;
      if (!def) category = req.params.id;

      results.forEach(function(element) {
        categories[element._doc._id.toString()] = element._doc.category;
      });

      Beer.find({ categoryId: category }).lean().exec(function(error, results) {
        if (error) throw error;
        var beers = results.map(function(element) {
          element.favorite = (favs.indexOf(element._id.toString()) < 0 ? false : true);
          element.inQueue = (que.indexOf(element._id.toString()) < 0 ? false : true);
          return element;
        });

        res.render('user_lib', {categories: categories, beers: beers});
      });
    });
  });
}

router.get('/', function (req, res) {
  var categories = {};
  User.findOne({ userIdString: req.user._id }, function(error, result) {
    if (error) throw error;
    result = result._doc;
    result.username = req.user.username;

    Category.find({}, function(error, results) {
      if (error) throw error;
      results.forEach(function(element) {
        categories[element._doc._id.toString()] = element._doc.category;
      });

      Beer.find({ _id: { $in: result.queue } }, function(error, results) {
        if (error) throw error;
        results.forEach(function(element, index) {
          results[index].category = categories[element._doc.categoryIdString];
          results[index]._doc.category = categories[element._doc.categoryIdString];
        });
        result.queue = results;

        Beer.find({ _id: { $in: result.favorites } }, function(error, results) {
          if (error) throw error;
          results.forEach(function(element, index) {
            results[index].category = categories[element._doc.categoryIdString];
            results[index]._doc.category = categories[element._doc.categoryIdString];
          });
          result.favorites = results;

          res.render('user_home', { title: 'HomeTap', user: result, beers: result.queue });
        });
      });
    });
  });
});

router.get('/favorites', function(req, res) {
  var categories = {};
  User.findOne({ userIdString: req.user._id }, function(error, result) {
    if (error) throw error;
    result = result._doc;
    result.username = req.user.username;

    Category.find({}, function(error, results) {
      if (error) throw error;
      results.forEach(function(element) {
        categories[element._doc._id.toString()] = element._doc.category;
      });

      Beer.find({ _id: { $in: result.queue } }, function(error, results) {
        if (error) throw error;
        results.forEach(function(element, index) {
          results[index].category = categories[element._doc.categoryIdString];
          results[index]._doc.category = categories[element._doc.categoryIdString];
        });
        result.queue = results;

        Beer.find({ _id: { $in: result.favorites } }, function(error, results) {
          if (error) throw error;
          results.forEach(function(element, index) {
            results[index].category = categories[element._doc.categoryIdString];
            results[index]._doc.category = categories[element._doc.categoryIdString];
          });
          result.favorites = results;

          res.render('user_home', { title: 'HomeTap', user: result, beers: result.favorites });
        });
      });
    });
  });
});

router.get('/beers', function (req, res) {
  renderUserLibrary(req, res, true);
});

router.get('/beers/category/:id', function(req, res) {
  renderUserLibrary(req, res, false);
});

router.put('/beers/favorite/:id', function(req, res) {
  User.findOne({ userIdString: req.user._id }).lean().exec(function(error, result) {
    if (error) throw error;
    var favs = result.favorites.map(function(element) {
      return element.toString();
    });
    if (favs.indexOf(req.params.id) < 0 ? false : true) {
      favs.splice(favs.indexOf(req.params.id), 1);
      User.update({ userIdString: req.user._id }, { $set: { favorites: favs } }, function(error) {
        if (error) throw error;
        res.end();
      });
    } else {
      favs.push(req.params.id);

      User.update({ userIdString: req.user._id }, { $set: { favorites: favs } }, function(error) {
        if (error) throw error;
        res.end();
      });
    }
  });
});

router.get('/beers/favorite/:id', function(req, res) {
  renderUserLibrary(req, res, false);
});

router.put('/beers/queue/:id', function(req, res) {
  User.findOne({ userIdString: req.user._id }).lean().exec(function(error, result) {
    if (error) throw error;
    var que = result.queue.map(function(element) {
      return element.toString();
    });
    if (que.indexOf(req.params.id) < 0 ? false : true) {
      que.splice(que.indexOf(req.params.id), 1);
      User.update({ userIdString: req.user._id }, { $set: { queue: que } }, function(error) {
        if (error) throw error;
        res.end();
      });
    } else {
      que.push(req.params.id);

      User.update({ userIdString: req.user._id }, { $set: { queue: que } }, function(error) {
        if (error) throw error;
        res.end();
      });
    }
  });
});

module.exports = router;
