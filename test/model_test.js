var chai = require('chai'),
    mongoose = require('mongoose');

var expect = chai.expect;
var dbURI = 'mongodb://hometapadminp:HomeTap2015@ds051943.mongolab.com:51943/hometap';
// var dbURI = require('./config').dbURI;
var db;

mongoose.connection.on('error', function(err){
  console.log(err);
});

describe('Test Database Schema', function() {
  var Beer = require('../models/beer.js');

  before('Connect to Database', function(done){
    db = mongoose.connect(dbURI);
    db.connection.on('open', done);
  });

  after('Close connection to Databse', function(done){
    db.disconnect(done);
  });

  describe('Test Beer Schema', function() {

    it('It should save a beer', function(done){
      var Beer = require('../models/beer.js');
      var lager = new Beer({
        name: 'Yummy',
        categoryId: 17,
        description: 'a great beer',
        stars: 4.3
      });

      lager.save(done);
    });

    it('should find the beer it saved', function(done){

      Beer.find({}, function(err, beers){
        expect(err).to.not.be.ok;
        expect(beers.length).to.equal(1);
        done();
      });
    });

    it('should remove all beers', function(done){
      Beer.find({}, function(err, beers){
        beers.forEach(function(beer){
          beer.remove();
          if(!!beers.length) done();
        });
      });
    });
  });
});
