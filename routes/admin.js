var express = require('express');

var router = express.Router();
var Beer = require('../models/beer');
var Category = require('../models/category');
var User = require('../models/user');

function renderAdminLib(req, res, def, catID) {
  User.findOne({userIdString: req.user._id}).lean().exec(function(error, result) {
    var favs  = result.favorites;
    var categories = {};

    Category.find({}, function(error, results){
      var category = results[0]._id;
      if (!def) category = req.params.id || catID;

      results.forEach(function(element) {
        categories[element._doc._id.toString()] = element._doc.category;
      });

      if(error) throw error;
      Beer.find({categoryId: category}).lean().exec(function(error, beers) {
        var newBeers = beers.map(function(beer) {
          beer.favorite = favs._id;
          return beer;
        });

        if(error) throw error;
        res.render('admin_lib', {categorylist: categories, cats: categories, beerlist: newBeers});
      });
    });
  });
}

router.get('/beers', function(req, res) {
  renderAdminLib(req, res, true);
});

router.post('/beers', function(req, res) {
  var newBeer = new Beer({
    name: req.body.name,
    categoryId: req.body.categoryId,
    description: req.body.description,
    stars: req.body.stars,
    categoryIdString: req.body.categoryId.toString()
  });
  newBeer.save(function(err) {
    if(err) console.log(err);
    renderAdminLib(req, res, false, req.body.categoryId);
  });
});

//potentially edit beers

router.delete('/beers/:id', function(req, res) {
    Beer.findByIdAndRemove(req.params.id, function(error) {
      if(error) throw error;
      // renderAdminLib(req, res, false);
      res.end()
    });
});

router.get('/beers/category/:id', function(req, res) {
  renderAdminLib(req, res, false);
});

router.get('/', function(req, res) {
  User.find({isAdmin: false}, function(err, users) {
    if(err) throw err;
    res.render('admin_home', {userList: users});
  });
});

router.put('/:id', function(req, res) {
  User.find({isAdmin: false}, function(err, users) {
      if(err) throw err;
    User.find({_id: req.params.id}).lean().exec(function(err, order) {
      if(err) throw err;
      var que = order[0].queue.shift();
      User.update({userIdString: req.user._id}, {$set: {queue: que}}, function(error) {
        if (error) throw error;
        console.log(que);
        res.render('admin_home', {userList: users});
      });
    });
  });
});

module.exports = router;
