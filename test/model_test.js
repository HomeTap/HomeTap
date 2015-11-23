var chai = require('chai');
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var expect = chai.expect;

var dbURI = require('./config').dbURI;
var db;

mongoose.connection.on('error', function(error) {
  console.error(error);
});

describe('Test Database Schema', function() {
  before('Connect to Database', function(done) {
    db = mongoose.connect(dbURI);
    db.connection.on('open', done);
  });

  after('Close connection to Database', function(done) {
    db.disconnect(done);
  });

  describe('Test Beer Schema', function() {
    var Beer = require('../models/beer');

    it('It should save a beer', function(done) {
      var lager = new Beer({
        name: 'Yummy',
        categoryId: ObjectId('564c34c49ce07853eb58086d'),
        description: 'a great beer',
        stars: 4.3,
        categoryIdString: '564c34c49ce07853eb58086d'
      });

      lager.save(done);
    });

    it('should find the beer it saved', function(done) {
      Beer.find({}, function(error, beers) {
        expect(error).to.be.an('null');
        expect(beers.length).to.equal(1);
        done();
      });
    });

    it('should remove all beers', function(done) {
      Beer.find({}, function(error, beers) {
        beers.forEach(function(beer) {
          beer.remove();
          if (!!beers.length) done();
        });
      });
    });
  });

  describe('Test Account Schema', function() {
    var Account = require('../models/account');

    it('It should save a fake account', function(done) {
      var newGuy = new Account({
        username: 'happyman',
        password: 'drinkAllDaBeerz'
      });

      newGuy.save(done);
    });

    it('should find the Account it saved', function(done) {
      Account.find({ username: 'happyman' }, function(error, accounts) {
        expect(error).to.not.be.an('undefined');
        expect(accounts.length).to.equal(1);
        done();
      });
    });

    it('should remove fake account', function(done) {
      Account.find({ username: 'happyman' }, function(error, accounts) {
        accounts.forEach(function(account) {
          account.remove();
          if (!!accounts.length) done();
        });
      });
    });
  });
});
