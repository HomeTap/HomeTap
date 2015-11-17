var chai = require('chai'),
    chaiHttp = require('chai-http');

var expect = chai.expect;
var baseURL = 'http://localhost:3000/admin';

require('../app.js');
chai.use(chaiHttp);

describe('Test Authentication', function() {
  it('Test No Authentication', function(done) {
    chai.request(baseURL)
      .get('admin/beers')
      .end(function(err, res){
        expect(res.status).to.equal(401);
        done();
      });
  });
  
  it('Test Admin Authentication', function(done) {
    chai.request(baseURL)
      .get('admin/beers')
      .auth('admin', 'password')
      .end(function(err, res) {
        expect(res.status).to.equal(200);
      });
  });

  it('Test User Authentication', function() {
    chai.request(baseURL)
      .get('user/beers')
      .auth('user', 'password')
      .end(function(err, res) {
        expect(res.status).to.equal(200);
      });
  });


});
