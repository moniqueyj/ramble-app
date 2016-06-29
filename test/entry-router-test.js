'use strict';

//set env
process.env.APP_SECRET = 'something123';
process.env.MONGODB_URI = 'mongodb://localhost/rambletest';

const expect = require('chai').expect;
const request = require('superagent-use');
const superPromise = require('superagent-promise-plugin');
const debug = require('debug')('ramble:entry-router-test');
const mongoose = require('mongoose');

const authController = require('../controller/auth-controller');
const entryController = require('../controller/entry-controller');
const userController = require('../controller/user-controller');

const port = process.env.PORT || 3000;
const baseUrl = `localhost:${port}/api`;
const server = require('../server');
const serverMaint = require('./lib/returnManageServer')(mongoose, server, port);
request.use(superPromise);

describe('testing module entry-router', function(){
  debug('before entry-router test module');
  before((done)=>{
    serverMaint.checkServer(done);
  });
  after((done)=>{
    serverMaint.closeServer(done);
  });

  describe('testing POST module entry-router', () =>{
    before((done)=>{
      authController.signup({username:'test', password:'12345'})
      .then((user)=>{
        this.tempUser = user;
        console.log(this.tempUser);
        done();
      })
      .catch(done);
    });
    after((done)=>{
      entryController.removeAllEntries();
      userController.removeAllUsers()
    .then(()=>done())
    .catch(done);
    });
    it('should return status 200 code',(done)=>{
      request.post(`${baseUrl}/entry`)
      .send({
        userId: this.tempUser._id,
        title: 'testing',
        keywords: 'test'
      })
      .set('Authorization', `Token ${this.tempUser}`)
      .then(res =>{
        expect(res.status).to.equal(200);
        done();
      })
      .catch(done);
    });
  });  //end of POST module
  //
  describe('testing for Error on POST route', ()=>{
    before((done)=>{
      authController.signup({username:'test', password:'12345'})
      .then((user)=>{
        this.tempUser = user;
        console.log(this.tempUser);
        done();
      })
      .catch(done);
    });
    after((done)=>{
      entryController.removeAllEntries();
      userController.removeAllUsers()
    .then(()=>done())
    .catch(done);
    });

    it('should return status code 400 with no body',(done)=>{
      request.post(`${baseUrl}/entry`)
      .send({})
      .set('Authorization', `Token ${this.tempUser}`)
      .then(done)
      .catch((err)=>{
        try {
          const res = err.response;
          expect(res.status).to.equal(400);
          done();
        } catch (err) {
          done(err);
        }
      });
    });
    it('should return status code 400 with no contents',(done)=>{
      request.post(`${baseUrl}/entry`)
      .send({
        hello:'goodbye'
      })
      .set('Authorization', `Token ${this.tempUser}`)
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
  describe('testing GET module entry-router', function(){
    before((done)=>{
      authController.signup({username:'test', password:'12345'})
      .then((user)=>{
        this.tempUser = user;
        console.log('TOKEN IS:', this.tempUser);
        done();
      })
      .catch(done);
    });
    after((done)=>{
      entryController.removeAllEntries();
      userController.removeAllUsers()
    .then(()=>done())
    .catch(done);
    });
    before((done)=>{
      request.post(`${baseUrl}/entry`)
      .set('Authorization', `Bearer ${this.tempUser}`)
      .send({
        userId: this.tempUser._id,
        title: 'testing',
        keywords: 'test'
      })
      .then((res)=>{
        this.tempEntry = res.body;
        done();
      })
      .catch(done);
    });
    it('should return status code 200',(done)=>{
      request.get(`${baseUrl}/entry/${this.tempEntry._id}`)
      .set('Authorization', `Bearer ${this.tempUser}`)
      .then(res => {
        expect(res.status).to.equal(200);
        done();
      })
      .catch(done);
    });
  });

  describe('testing for Error on GET module', function(){
    before((done)=>{
      authController.signup({username:'test', password:'12345'})
      .then((user)=>{
        this.tempUser = user;
        console.log('TOKEN IS:', this.tempUser);
        done();
      })
      .catch(done);
    });
    after((done)=>{
      entryController.removeAllEntries();
      userController.removeAllUsers()
    .then(()=>done())
    .catch(done);
    });
    before((done)=>{
      request.post(`${baseUrl}/entry`)
      .set('Authorization', `Bearer ${this.tempUser}`)
      .send({
        userId: this.tempUser._id,
        title: 'testing',
        keywords: 'test'
      })
      .then((res)=>{
        this.tempEntry = res.body;
        done();
      })
      .catch(done);
    });
    it('should return status code 404', (done)=>{
      request.get(`${baseUrl}/entry/${this.tempEntry._id+1}`)
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
  describe('testing PUT module on entery-router', function(){
    before((done)=>{
      authController.signup({username:'test', password:'12345'})
      .then((user)=>{
        this.tempUser = user;
        done();
      })
      .catch(done);
    });
    after((done)=>{
      entryController.removeAllEntries();
      userController.removeAllUsers()
    .then(()=>done())
    .catch(done);
    });
    before((done)=>{
      request.post(`${baseUrl}/entry`)
      .set('Authorization', `Bearer ${this.tempUser}`)
      .send({
        userId: this.tempUser._id,
        title: 'testing',
        keywords: 'test'
      })
      .then((res)=>{
        this.tempEntry = res.body;
        done();
      })
      .catch(done);
    });
    it('should return status code 200',(done)=>{
      request.put(`${baseUrl}/entry/${this.tempEntry._id}`)
      .set('Authorization', `Bearer ${this.tempUser}`)
      .send({
        title: 'new testing protocol',
        keywords: 'PUT test'
      })
      .then(res => {
        expect(res.status).to.equal(200);
        done();
      })
      .catch(done);
    });
  });
  describe('testing for Error on PUT module', function(){
    before((done)=>{
      authController.signup({username:'test', password:'12345'})
      .then((user)=>{
        this.tempUser = user;
        done();
      })
      .catch(done);
    });
    after((done)=>{
      entryController.removeAllEntries();
      userController.removeAllUsers()
    .then(()=>done())
    .catch(done);
    });
    before((done)=>{
      request.post(`${baseUrl}/entry`)
      .set('Authorization', `Bearer ${this.tempUser}`)
      .send({
        userId: this.tempUser._id,
        title: 'testing',
        keywords: 'test'
      })
      .then((res)=>{
        this.tempEntry = res.body;
        done();
      })
      .catch(done);
    });
    it('should return status code 400 with no body',(done)=>{
      request.put(`${baseUrl}/entry/${this.tempEntry._id}`)
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
    it('should return status code 404 with no id', (done)=>{
      request.put(`${baseUrl}/entry/${this.tempEntry._id+1}`)
      .set('Authorization', `Bearer ${this.tempUser}`)
      .send({
        userId: this.tempUser._id,
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
    before((done)=>{
      authController.signup({username:'test', password:'12345'})
      .then((user)=>{
        this.tempUser = user;
        done();
      })
      .catch(done);
    });
    after((done)=>{
      entryController.removeAllEntries();
      userController.removeAllUsers()
    .then(()=>done())
    .catch(done);
    });
    before((done)=>{
      request.post(`${baseUrl}/entry`)
      .set('Authorization', `Bearer ${this.tempUser}`)
      .send({
        userId: this.tempUser._id,
        title: 'testing',
        keywords: 'test'
      })
      .then((res)=>{
        this.tempEntry = res.body;
        done();
      })
      .catch(done);
    });
    it('should return status code 204',(done)=>{
      request.del(`${baseUrl}/entry/${this.tempEntry._id}`)
      .set('Authorization', `Bearer ${this.tempUser}`)
      .then(res => {
        expect(res.status).to.equal(204);
        done();
      })
      .catch(done);
    });
  });
  describe('testing for Error on DELETE module', function(){
    before((done)=>{
      authController.signup({username:'test', password:'12345'})
      .then((user)=>{
        this.tempUser = user;
        done();
      })
      .catch(done);
    });
    after((done)=>{
      entryController.removeAllEntries();
      userController.removeAllUsers()
    .then(()=>done())
    .catch(done);
    });
    before((done)=>{
      request.post(`${baseUrl}/entry`)
      .set('Authorization', `Bearer ${this.tempUser}`)
      .send({
        userId: this.tempUser._id,
        title: 'testing',
        keywords: 'test'
      })
      .then((res)=>{
        this.tempEntry = res.body;
        done();
      })
      .catch(done);
    });
    it('should return status code 404 with wrong entryId',(done)=>{
      request.del(`${baseUrl}/entry/${this.tempEntry._id+1}`)
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
    it('should return status code 401 with wroung userId', (done)=>{
      request.del(`${baseUrl}/entry/${this.tempEntry._id}`)
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
});//end of entry test module
