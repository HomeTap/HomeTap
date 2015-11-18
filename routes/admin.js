var express = require('express');
var router = express.Router();

router.get('/beers', function(req, res) {
  res.send(200, 'Beers for everyone');
});

router.post('/beers', function(req, res) {
  var input = req.body;
  res.status(200).send(input);
  // input.save();
});

router.put('/beers', function(req,res) {

});

module.exports = router;
