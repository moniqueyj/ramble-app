'use strict';

process.env.APP_SECRET = 'something123';
process.env.MONGODB_URI = 'mongodb://localhost/rambletest';

const debug = require('debug')('ramble:challenge-router-test');
const expect = require('chai').expect;
const request = require('superagent-use');
const superPromise = require('superagent-promise-plugin');
const mongoose = require('mongoose');

const server = require('../server');
const port = process.env.PORT || 3000;
const baseUrl = `http://localhost:${port}/api`;
const User = require('../model/user');

const authController = require('../controller/auth-controller');
const userController = require('../controller/user-controller');
const entryController = require('../controller/entry-controller');
const challengeController = require('../controller/challenge-controller');
const serverMaint = require('./lib/returnManageServer')(mongoose, server, port);

request.use(superPromise);

describe('testing challenge router', function(){
  before((done)=>{
    serverMaint.checkServer(done);
  });

  after((done)=>{
    serverMaint.closeServer(done);
  });

  //test post
  describe('testing POST module challenge-router', ()=>{
    before((done) => {
      authController.signup({username: 'ramble', password: 'rabbletestpassword'})
      .then((user) => {
        this.tempUser = user;
        console.log(this.tempUser);
        done();
      })
      .catch(done);
    });
    after((done) =>{
      userController.removeAllUsers();
      challengeController.removeAllChallenges()
      .then(() => done())
      .catch(done);
    });
    it('should return a challenge status 200', (done)=>{
      request.post(`${baseUrl}/challenges`)
      .send({
        userId: this.tempUser._id,
        content:'test'
      })
      .set('Authorization', `Token ${this.tempUser}`)
      .then(res => {
        expect(res.status).to.equal(200);
        done();
      })
      .catch(done);
    });
  });

    //   //create user
    //   new User('ramble', 'rabblerabble')
    //   .then((user) => {
    //     this.tempUser = user;
    //     done();
    //   })
    //   .catch(done)
    // });
    // it('should return a challenge', (done)=>{
    //   request.post(`${baseUrl}/challenges`)
    //   .send({
    //     content:'test'
    //     , userId: this.tempUser.id
    //   })
    //   .then((res) => {
    //     expect(res.status).to.equal(200);
    //     done();
    //   })
    //   .catch(done);
    // })

  //test get by id

  //test get all

  //test put

  //test delete


});//outer
