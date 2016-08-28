'use strict';

process.env.APP_SECRET = 'something123';
process.env.MONGODB_URI = 'mongodb://localhost/rambletest';

const debug = require('debug')('ramble:prompt-router-test');
const expect = require('chai').expect;
const request = require('superagent-use');
const superPromise = require('superagent-promise-plugin');
const mongoose = require('mongoose');

const server = require('../server');
const port = process.env.PORT || 3000;
const baseUrl = `http://localhost:${port}/api`;

const authController = require('../controller/auth-controller');
const userController = require('../controller/user-controller');
const promptController = require('../controller/prompt-controller');
const serverMaint = require('./lib/returnManageServer')(mongoose, server, port);
const preamble = require('./lib/preprompt')(request, authController,promptController, userController, server, port, baseUrl);

request.use(superPromise);

describe('testingprompt router', function(){
  debug('promptTest');
  before((done)=>{
    serverMaint.checkServer(done);
  });

  after((done)=>{
    serverMaint.closeServer(done);
  });

  //test post
  describe('testing POST moduleprompt-router', ()=>{
    before((done) => {
      preamble.promptPreBlock.call(this, done);
    });
    after((done)=>{
      preamble.promptPostBlock(done);
    });
    it('should return a prompt status 200', (done)=>{
      request.post(`${baseUrl}/prompts`)
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
      preamble.promptPreBlock.call(this, done);
    });
    after((done)=>{
      preamble.promptPostBlock(done);
    });
    it('should return and 400 with no body', (done) =>{
      request.post(`${baseUrl}/prompts`)
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

      preamble.promptPreBlock.call(this, done);
    });
    after((done)=>{
      preamble.promptPostBlock(done);
    });
    it('should return a 400 Error with wrong Schema contents', (done)=>{
      request.post(`${baseUrl}/prompts`)
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
  describe('testing GET moduleprompt-router', function(){
    before((done) => {
      preamble.promptPreBlock.call(this, done);
    });
    after((done)=>{
      preamble.promptPostBlock(done);
    });
    before((done) => {
      preamble.postPromptBeforeBlock.call(this, done);
    });
    it('should return status code 200', (done)=>{
      console.log(this.tempUser);
      request.get(`${baseUrl}/prompts/${this.tempPrompt._id}`)
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
      preamble.promptPreBlock.call(this, done);
    });
    after((done)=>{
      preamble.promptPostBlock(done);
    });
    before((done) => {
      preamble.postPromptBeforeBlock.call(this, done);
    });
    it('should return status code 404 wrongprompt id', (done)=>{
      request.get(`${baseUrl}/prompts/${this.tempPrompt._id+1}`)
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
      preamble.promptPreBlock.call(this, done);
    });
    after((done)=>{
      preamble.promptPostBlock(done);
    });
    before((done) => {
      preamble.postPromptBeforeBlock.call(this, done);
    });
    it('should return a 400 with wrong user Id', (done) =>{
      request.get(`${baseUrl}/prompts/${this.tempPompt_id}`)
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
  describe('testing GET all moduleprompt-router', function(){
    before((done) => {
      preamble.promptPreBlock.call(this, done);
    });
    after((done)=>{
      preamble.promptPostBlock(done);
    });
    before((done) => {
      preamble.postPromptBeforeBlock.call(this, done);
    });
    it('should return status code 200', (done)=>{
      request.get(`${baseUrl}/prompts`)
      .set('Authorization', `Bearer ${this.tempUser}`)
      .then(res => {
        expect(res.status).to.equal(200);
        done();
      })
      .catch(done);
    });
  });
  describe('testing GET allprompts Error', function(){
    before((done) => {
      preamble.promptPreBlock.call(this, done);
    });
    after((done)=>{
      preamble.promptPostBlock(done);
    });
    it('should return a code 404', (done)=>{
      request.get(`${baseUrl}/prompts`)
      .set('Authorization', `Bearer ${this.tempUser}`)
      .then(res => {
        expect(res.status).to.equal(200);
        done();
      })
      .catch(done);
    });
  });
  describe('testing PUT module onprompt-router', function(){
    before((done) => {
      preamble.promptPreBlock.call(this, done);
    });
    after((done)=>{
      preamble.promptPostBlock(done);
    });
    before((done) => {
      preamble.postPromptBeforeBlock.call(this, done);
    });
    it('should return status code 200', (done) =>{
      request.put(`${baseUrl}/prompts/${this.tempPrompt._id}`)
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
  describe('testing for Error on PUT', function(){
    before((done) => {
      preamble.promptPreBlock.call(this, done);
    });
    after((done)=>{
      preamble.promptPostBlock(done);
    });
    before((done) => {
      preamble.postPromptBeforeBlock.call(this, done);
    });
    it('should return status code 400 with no body', (done)=>{
      request.put(`${baseUrl}/entry/${this.tempPrompt._id}`)
      .set('Authorization', `Bearer ${this.tempUser}`)
      .send({})
      .then(() => done())
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
    it('should return status code 404 with wrong use id', (done)=>{
      request.put(`${baseUrl}/entry/${this.tempPrompt._id}`)
      .set('Authorization', `Bearer ${this.tempUser}`)
      .send({
        userId: this.tempUser._id+1,
        title: 'testing',
        keywords: 'test'
      })
      .then(() => done())
      .catch((err) =>{
        try{
          const res = err.response;
          expect(res.status).to.equal(404);
          done();
        } catch (err) {
          done(err);
        }
      });
    });
  });
  describe('testing on DELETE module', function(){
    before((done) => {
      preamble.promptPreBlock.call(this, done);
    });
    after((done)=>{
      preamble.promptPostBlock(done);
    });
    before((done) => {
      preamble.postPromptBeforeBlock.call(this, done);
    });
    it('should return status code 204', (done) =>{
      request.del(`${baseUrl}/entry/${this.tempPrompt._id}`)
      .set('Authorization', `Bearer ${this.tempUser}`)
      .then(res => {
        expect(res.status).to.equal(204);
        done();
      })
      .catch(done);
    });
  });
  describe('testing for Error on Delete', function(){
    before((done) => {
      preamble.promptPreBlock.call(this, done);
    });
    after((done)=>{
      preamble.promptPostBlock(done);
    });
    before((done) => {
      preamble.postPromptBeforeBlock.call(this, done);
    });
    it('should return status code 404 with wrong entryId',(done)=>{
      request.del(`${baseUrl}/entry/${this.tempPrompt._id+1}`)
      .set('Authorization', `Bearer ${this.tempUser}`)
      .then(() => done())
      .catch((err) =>{
        try{
          const res = err.response;
          expect(res.status).to.equal(404);
          done();
        } catch (err) {
          done(err);
        }
      });
    });
    it('should return status code 401 with wrong password', (done)=>{
      request.del(`${baseUrl}/entry/${this.tempPrompt._id}`)
      .set('Authorization', `Bearer ${this.tempUser+1}`)
      .then(() => done())
      .catch((err) =>{
        try{
          const res = err.response;
          expect(res.status).to.equal(401);
          done();
        } catch (err) {
          done(err);
        }
      });
    });
  });
});//outer
