var chai = require('chai'),
    mongoose = require('mongoose');

var expect = chai.expect;
var dbURI = 'mongodb://hometapadminp:HomeTap2015@ds051943.mongolab.com:51943/hometap';
// var dbURI = require('./config').dbURI;
var db;

mongoose.connection.on('error', function(err) {
  console.log(err);
});

describe('Test Database Schema', function() {

  before('Connect to Database', function(done) {
    db = mongoose.connect(dbURI);
    db.connection.on('open', done);
  });

  after('Close connection to Databse', function(done) {
    db.disconnect(done);
  });

  describe('Test Beer Schema', function() {
    var Beer = require('../models/beer.js');

    it('It should save a beer', function(done) {
      var lager = new Beer({
        name: 'Yummy',
        categoryId: 17,
        description: 'a great beer',
        stars: 4.3
      });

      lager.save(done);
    });

    it('should find the beer it saved', function(done) {

      Beer.find({}, function(err, beers) {
        expect(err).to.be.an('null');
        expect(beers.length).to.equal(1);
        done();
      });
    });

    it('should remove all beers', function(done) {
      Beer.find({}, function(err, beers) {
        beers.forEach(function(beer) {
          beer.remove();
          if (!!beers.length) done();
        });
      });
    });
  });

  describe('Test Account Schema', function() {
    var Account = require('../models/account.js');

    it('It should save a fake account', function(done) {
      var newGuy = new Account({
        username: 'happyman',
        screeName: 'drinkAllDaBeerz',
        isAdmin: false,
        queue: [],
        favorites: [],
        subscription: 64
      });

      newGuy.save(done);
    });

    it('should find the Account it saved', function(done) {

      Account.find({username: 'happyman'}, function(err, accounts) {
        expect(err).to.not.be.an('undefind');
        expect(accounts.length).to.equal(1);
        done();
      });
    });

    it('should remove fake account', function(done) {
      Account.find({username: 'happyman'}, function(err, accounts) {
        accounts.forEach(function(account) {
          account.remove();
          if (!!accounts.length) done();
        });
      });
    });
  });
});
