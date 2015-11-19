var chai = require('chai'),
    chaiHttp = require('chai-http');

var expect = chai.expect;
var baseURL = 'http://localhost:3000/admin';

require('../app.js');
chai.use(chaiHttp);

describe('Test admin routes', function() {

  describe('Test beer library routes', function() {

    it('should get a response', function(done) {
      chai.request(baseURL)
        .get('/beers')
        .end(function(err, res) {
          expect(err).to.be.an('null');
          console.log(res);
          done();
        });
    });

    it('should work with a post request', function(done) {
      chai.request(baseURL)
        .post('/beers')
        .send({
          name: 'Tasty',
          categoryId: 17,
          description: 'real good stuff',
          stars: 4.2
        })
        .end(function(err, res) {
          expect(err).to.be.an('null');
          console.log(res);
          done();
        });
    });

  });

});
