'use strict';

process.env.APP_SECRET = 'something123';
process.env.MONGODB_URI = 'mongodb://localhost/rambletest';

const mongoose = require('mongoose');
const debug = require('debug')('ramble:auth-router-test');
const expect = require('chai').expect;
const request = require('superagent-use');
const superPromise = require('superagent-promise-plugin');

const authRouter = require('../route/auth-router');
const authController = require('../controller/auth-controller');
const userController = require('../controller/user-controller');

const server = require('../server');
const port = process.env.PORT || 3000;
const baseUrl = `http://localhost:${port}/api`;
const serverMaint = require('./lib/returnManageServer')(mongoose, server, port);

request.use(superPromise);

describe('testing auth-router module', function(){
  before(done => {
    serverMaint.checkServer(done);
  });
  after(done => {
    serverMaint.closeServer(done);
  });

  describe('POST test module', function() {
    it('should return a new user/password', (done) => {
      request.post(`${baseUrl}/signup`)
      .send({username: 'testuser', password: 'testpassword'})
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });

    it('should return status 400 for empty body', (done) => {
      request.post(`${baseUrl}/signup`)
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });

    it('should return status 400 for invalid body', (done) => {
      request.post(`${baseUrl}/signup`)
      .send({something: 'something!'})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  }); // end POST test module

  describe('GET test module', function(){
    before((done) => {
      authController.signup({username: 'test user', password: 'test password'})
      .then( () => done()).catch(done);
    });
    after((done) => {
      userController.removeAllUsers();
      done();
    });

    it('should return status 200', (done) => {
      request.get(`${baseUrl}/signin`)
      .auth('test user', 'test password')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });

    it('should return status 401 unauthorized', (done) => {
      request.get(`${baseUrl}/signin`)
      .auth('testwrong', 'test password')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
    });
  }); // end GET test module
}); // end auth-routre testing module
