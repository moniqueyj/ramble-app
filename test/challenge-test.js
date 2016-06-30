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
const challengeController = require('../controller/challenge-controller');
const serverMaint = require('./lib/returnManageServer')(mongoose, server, port);
const preamble = require('./lib/prechallenge')(request, authController, challengeController, userController, server, port, baseUrl);

request.use(superPromise);

describe('testing challenge router', function(){
  debug('challengeTest');
  before((done)=>{
    serverMaint.checkServer(done);
  });

  after((done)=>{
    serverMaint.closeServer(done);
  });

  //test post
  describe('testing POST module challenge-router', ()=>{
    before((done) => {
      preamble.challengePreBlock.call(this, done);
    });
    after((done)=>{
      preamble.ChallengePostBlock(done);
    });
    it('should return a challenge status 200', (done)=>{
      request.post(`${baseUrl}/challenges`)
      .send({
        userId: this.tempUser._id,
        content:'test'
      })
      .set('Authorization', `Bearer ${this.tempUser}`)
      .then(res => {
        expect(res.status).to.equal(200);
        done();
      })
      .catch(done);
    });
  });
  describe('testing for Error on POST route', ()=>{
    before((done) => {
      preamble.challengePreBlock.call(this, done);
    });
    after((done)=>{
      preamble.ChallengePostBlock(done);
    });
    it('should return and 400 with no body', (done) =>{
      request.post(`${baseUrl}/challenges`)
      .send({})
      .set('Authorization', `Bearer ${this.tempUser}`)
      .then(done)
      .catch((err)=>{
        try{
          const res = err.response;
          expect(res.status).to.equal(400);
          done();
        } catch(err) {
          done(err);
        }
      });
    });
  });
  describe('testing for Error on POST route', ()=>{
    before((done) => {
      preamble.challengePreBlock.call(this, done);
    });
    after((done)=>{
      preamble.ChallengePostBlock(done);
    });
    it('should return a 400 Error with wrong Schema contents', (done)=>{
      request.post(`${baseUrl}/challenges`)
      .send({
        beer: 'Universale'
      })
      .set('Authorization', `Bearer ${this.tempUser}`)
      .then(done)
      .catch((err) =>{
        try{
          const res = err.response;
          expect(res.status).to.equal(400);
          done();
        } catch (err) {
          done(err);
        }
      });
    });
  });
  describe('testing GET module challenge-router', function(){
    before((done) => {
      preamble.challengePreBlock.call(this, done);
    });
    after((done)=>{
      preamble.ChallengePostBlock(done);
    });
    before((done) => {
      preamble.postChallengeBeforeBlock.call(this, done);
    });
    it('should return status code 200', (done)=>{
      console.log(this.tempUser);
      request.get(`${baseUrl}/challenges/${this.tempChallenge._id}`)
      .set('Authorization', `Bearer ${this.tempUser}`)
      .then(res => {
        expect(res.status).to.equal(200);
        done();
      })
      .catch(done);
    });
  });
  describe('testing for Error on GET module', function(){
    before((done) => {
      preamble.challengePreBlock.call(this, done);
    });
    after((done)=>{
      preamble.ChallengePostBlock(done);
    });
    before((done) => {
      preamble.postChallengeBeforeBlock.call(this, done);
    });
    it('should return status code 404 wrong challenge id', (done)=>{
      request.get(`${baseUrl}/challenges/${this.tempChallenge._id+1}`)
      .set('Authorization', `Bearer ${this.tempUser}`)
      .then(res => {
        expect(res.status).to.equal(404);
        done();
      })
      .catch(() => {
        done();
      });
    });
  });
  describe('testing for Error on GET module', function(){
    before((done) => {
      preamble.challengePreBlock.call(this, done);
    });
    after((done)=>{
      preamble.ChallengePostBlock(done);
    });
    before((done) => {
      preamble.postChallengeBeforeBlock.call(this, done);
    });
    it('should return a 400 with wrong user Id', (done) =>{
      request.get(`${baseUrl}/challenges/${this.tempChallenge_id}`)
      .set('Authorization', `Bearer ${this.tempUser+1}`)
      .then(res => {
        expect(res.status).to.equal(404);
        done();
      })
      .catch(() => {
        done();
      });
    });
  });
  describe('testing PUT module on challenge-router', function(){
    before((done) => {
      preamble.challengePreBlock.call(this, done);
    });
    after((done)=>{
      preamble.ChallengePostBlock(done);
    });
    before((done) => {
      preamble.postChallengeBeforeBlock.call(this, done);
    });
    it('should return status code 200', (done) =>{
      request.put(`${baseUrl}/challenges/${this.tempChallenge._id}`)
      .set('Authorization', `Bearer ${this.tempUser}`)
      .send({
        userId:this.tempUser._id,
        content: 'new testing protocol'
      })
      .then(res => {
        expect(res.status).to.equal(200);
        done();
      })
      .catch(done);
    });
  });



});//outer
