// 'use strict';
//
// process.env.APP_SECRET = 'something123';
// process.env.MONGODB_URI = 'mongodb://localhost/rambletest';
//
// const debug = require('debug')('ramble:auth-controller-test');
// const expect = require('chai').expect;
// const request = require('superagent-use');
// const superPromise = require('superagent-promise-plugin');
//
// const server = require('../server');
// const port = process.env.PORT || 3000;
// const baseUrl = `http://localhost:${port}/api`;
//
// const authController = require('../controller/auth-controller');
// const userController = require('../controller/user-controller');
//
// request.use(superPromise);
//
// describe('testing auth-controller module', function(){
//   before( (done) => {
//     debug('before module auth-controller');
//     if(!server.isRunning){
//       server.listen(port, () => {
//         server.isRunning = true;
//         console.log('server started booyahhackerhackeretcetc', port);
//         done();
//       });
//       return;
//     }
//     done();
//   });
//
//   after( (done) => {
//     debug('after module auth-controller');
//     if(server.isRunning){
//       server.close( () => {
//         server.isRunning = false;
//         console.log('server be down');
//         done();
//       });
//       return;
//     }
//     done();
//   });
//
//   describe('test POST /signup', function(){
//     after( (done) => {
//       userController.removeAllUsers()
//       .then(() => done())
//       .catch(done);
//     });
//
//     it('should return status 200', (done) => {
//       request.post(`${baseUrl}/signup`)
//       .send({username: 'test user', password: 'test password'})
//       .then( res => {
//         expect(res.status).to.equal(200);
//         done();
//       })
//       .catch(done);
//     });
//
//   }); // end POST test module
//
//   describe('test bad POST /signup', function(){
//
//     it('should return status 400 for no body', (done) => {
//       request.post(`${baseUrl}/signup`)
//       .send({})
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         done();
//       });
//     });
//
//     it('should return status 400 for invalid body', (done) => {
//       request.post(`${baseUrl}/signup`)
//       .send({hello: 'goodbye'})
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         done();
//       });
//     });
//   }); // end bad POST test module
//
//   describe('test GET /signin', function(){
//     before( (done) => {
//       authController.signup({
//         username: 'test user',
//         password: 'test password'
//       })
//       .then( () => done())
//       .catch(done);
//     });
//     after( (done) => {
//       userController.removeAllUsers()
//       .then( () => done())
//       .catch(done);
//     });
//
//     it('should return status 200 and a token', (done) => {
//       request.get(`${baseUrl}/signin`)
//       .auth('test user', 'test password')
//       .then( res => {
//         expect(res.status).to.equal(200);
//         expect(res.text.length).to.equal(205);
//         // TODO: Find alternate way to test for token.
//         // Ex. Pass token as an object w/ property 'token:',
//         // then test for the returned obj containing 'token' property.
//         done();
//       })
//       .catch(done);
//     });
//   }); // end GET test module
//
//   describe('test bad GET /signin', function(){
//     before( (done) => {
//       authController.signup({
//         username: 'test user',
//         password: 'test password'
//       })
//       .then( () => done())
//       .catch(done);
//     });
//     after( (done) => {
//       userController.removeAllUsers()
//       .then( () => done())
//       .catch(done);
//     });
//
//     it('should return status 401 for wrong password', (done) => {
//       request.get(`${baseUrl}/signin`)
//       .auth('test user', 'wrong password')
//       .end((err, res) => {
//         expect(res.status).to.equal(401);
//         done();
//       });
//     });
//
//     it('should return status 401 for no body', (done) => {
//       request.get(`${baseUrl}/signin`)
//       .end((err, res) => {
//         expect(res.status).to.equal(401);
//         done();
//       });
//     });
//   }); // end bad GET test module
//
//   // describe('test PUT /update/password', function(){
//   //   before( (done) => {
//   //     debug('before PUT /update/password');
//   //     authController.signup({
//   //       username: 'test user',
//   //       password: 'test password'
//   //     })
//   //     .then( (token) => {
//   //       this.tempToken = token;
//   //       done();
//   //     })
//   //     .catch(done);
//   //   });
//   //   after( (done) => {
//   //     debug('after PUT /update/password');
//   //     userController.removeAllUsers()
//   //     .then( () => done())
//   //     .catch(done);
//   //   });
//   //
//   //   it('should return an updated password', (done) => {
//   //     debug('testing password update');
//   //     request.put(`${baseUrl}/update/password`)
//   //     // .set('Authorization', `Bearer ${this.tempToken}`)
//   //     // .auth('test user', 'test password')
//   //     .send({username: 'test user', password: 'test password'})
//   //     .send({username: 'test user', password: 'updated password'})
//   //     .then((res) => {
//   //       expect(res.status).to.equal(200);
//   //       expect(res.username).to.equal('test user');
//   //       expect(res.password).to.equal('updated password');
//   //       done();
//   //     })
//   //     .catch(done);
//   //   });
//   // }); // end PUT test module
//
// }); // end of auth-router test module
