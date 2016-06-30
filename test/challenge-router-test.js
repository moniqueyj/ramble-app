// 'use strict';
//
// process.env.MONGODB_URI = 'mongodb://localhost/rambletest';
// process.env.APP_SECRET = 'something123';
//
// const debug = require('debug')('ramble:challenge-router-test');
// const expect = require('chai').expect;
// const request = require('superagent-use');
// const superPromise = require('superagent-promise-plugin');
//
// const authController = require('../controller/auth-controller');
// const challengeController = require('../controller/challenge-controller');
// const entryController = request('../controller/entry-controller');
// const userController = require('../controller/user-controller');
//
// const server = require('../server');
// const port = process.env.PORT || 3000;
// const baseUrl = `http://localhost:${port}/api`;
//
// request.use(superPromise);
//
// describe('testing challenge-router module', function(){
//
//   beforeEach((done) => {
//     debug('beforeEach');
//     authController.signup({username: 'test user', password: 'test password'})
//     .then((user) => {
//       this.tempUser = user;
//     })
//     .then(() => {
//       entryController.createEntry({
//         // things
//       })
//     })
//   });
//
//   afterEach((done) => {
//     Promise.all([
//       userController.removeAllUsers()
//     ])
//   })
// }); // end challenge-router test module
