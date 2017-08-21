const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server.js');
const should = chai.should();
const User = require('./../server/user/userModel');

chai.use(chaiHttp);

/*
 *  This set of tests tests for API functionality,
 *  not front-end display and behavior
 */

describe('User Creation (\"Authentication\" routes in server.js)', function() {
  // Can we load the config page?
  it('should successfully send html page on /config GET', done => {
    chai.request(server)
    .get('/config')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.html;
      done();
    });
  });
  // Can we get bundled files?
  it('should send bundled js for the /config page', done => {
    chai.request(server)
    .get('/static/bundles/config.bundle.js')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    });
  });
  // Can we create the initial admin?
  it('should create admin if no users in db, without requiring cookies', done => {
    chai.request(server)
    .post('/config/admin')
    .field('username', 'test' + Math.floor(100 * Math.random()))
    .field('password', 'test')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      
      done();
    });
  });
  // Can we generate an invite?
  // it('should ');
});
