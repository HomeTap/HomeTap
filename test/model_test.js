var chai = require('chai'),
    mongoose = require('mongoose');

var expect = chai.expect; 
var mongodbUri = ' mongodb://hometapadminp:HomeTap2015@ds051943.mongolab.com:51943/hometap';


describe('Test Database Schema', function() {
  beforeEach('Connect to Database', function(done){
    mongoose.connect(mongodbUri);
  });

  afterEach('Close connection to Databse', function(done){

  });

  it('should connect to the user schema', function(done){

  });

  it('should connecto to the beer schema', function(done){

  });

  it('should connect to the account schema', function(done){

  });

  it('should connecto to the categories schema', function(done){

  });
});
