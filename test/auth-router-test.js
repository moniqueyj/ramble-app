'use strict';

process.env.APP_SECRET = 'something123';
process.env.MONGODB_URI = 'mongodb://localhost/rambletest';

const mongoose = require('mongoose');
const expect = require('chai').expect;
const request = require('superagent-use');
const superPromise = require('superagent-promise-plugin');

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

    it('should return status 401 wrong user right password', (done) => {
      request.get(`${baseUrl}/signin`)
      .auth('wrong user', 'test password')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
    });

    it('should return status 401 right user wrong password', (done) => {
      request.get(`${baseUrl}/signin`)
      .auth('test user', 'wrong password')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
    });
  }); // end GET test module

  describe('PUT test module', function(){
    before(done => {
      authController.signup({username: 'test user1', password: 'test password'})
      .then((token) => {
        this.tempToken = token;
        done();
      })
      .catch(done);
    });
    after(done => {
      userController.removeAllUsers();
      done();
    });

    it('should return 200 and updated password', (done) => {
      request.put(`${baseUrl}/update/password`)
      .set('Authorization', `Bearer ${this.tempToken}`)
      .send({
        oldPassword: 'test password',
        newPassword: 'updated password'
      })
      .end((err, res) => {
        res.newToken = res.text;
        expect(res.status).to.equal(200);
        expect(res.newToken).to.not.equal(this.tempToken);
        done();
      });

      it('should return status 401 unauthorized password change', (done) => {
        request.put(`${baseUrl}/update/password`)
        .set('Authorization', `Bearer ${1234}`)
        .send({
          oldPassword: 'test password',
          newPassword: 'updated password'
        })
        .end((err, res) => {
          res.newToken = res.text;
          expect(res.status).to.equal(401);
          done();
        });
      });
    });
  }); // end PUT test module

  describe('DELETE test module', function(){
    before(done => {
      authController.signup({username: 'test user2', password: 'test password'})
      .then((token) => {
        this.tempToken = token;
        done();
      })
      .catch(done);
    });

    it('should return status 204 successfully deleted user', (done) => {
      request.del(`${baseUrl}/delete`)
      .set('Authorization', `Bearer ${this.tempToken}`)
      .send({confirmPassword: 'test password'})
      .end((err, res) => {
        expect(res.status).to.equal(204);
        done();
      });
    });
  }); // end DELETE test module

  it('should return 401 bad token', (done) => {
    request.del(`${baseUrl}/delete`)
    .set('Authorization', `Bearer ${1234}`)
    .send({confirmPassword: 'test password'})
    .end((err, res) => {
      expect(res.status).to.equal(401);
      done();
    });
  });

  it('should return 401 wrong confirmPassword', (done) => {
    request.del(`${baseUrl}/delete`)
    .set('Authorization', `Bearer${this.tempToken}`)
    .send({confirmPassword: 'wrong password'})
    .end((err, res) => {
      expect(res.status).to.equal(401);
      done();
    });
  });
}); // end auth-router testing module
