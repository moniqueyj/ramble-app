'use strict';

const debug = require('debug')('ramble:auth-controller');
const User = require('../model/user');
const httpErrors = require('http-errors');

exports.signup = function(reqBody){
  return new Promise((resolve, reject) => {
    debug('signupPromise');
    var password = reqBody.password;
    delete reqBody.password;
    var user = new User(reqBody);
    user.generateHash(password)
    .then(user => user.save())
    .then(user => user.generateToken())
    .then(token => resolve(token))
    .catch(reject);
  });
};

exports.signin = function(auth){
  debug('signinPromise');
  return new Promise((resolve, reject) => {
    User.findOne({username:auth.username})
      .then((user) => {
        if(user === null){
          return reject(httpErrors(401, 'wrong username or password'));
        }
        return user.compareHash(auth.password);
      })
      .then(user =>  user.generateToken())
      .then(token => resolve(token))
      .catch(reject);
  });
};


// post with a token
// and body should contain
//   oldPassword
//   newPassword
exports.updatePassword = function(userId, reqBody){
  debug('updateSignin');
  return new Promise((resolve, reject) => {
    User.findOne({ _id: userId })
    .then(user => user.compareHash(reqBody.oldPassword))
    .then(user => user.generateHash(reqBody.newPassword))
    .then(user => user.save())
    .then(user => user.generateToken())
    .then(token => resolve(token))
    .catch(reject);
  });
};

exports.deleteUser = function(userId, reqBody){
  debug('deleteUser');
  return new Promise((resolve, reject) => {
    User.findOne({_id: userId})
    .then(user => {
      user.compareHash(reqBody.confirmPassword)
      .then((user) => {
        user.remove();
        resolve();
      })
      .catch(reject);
    })
    .catch(reject);
  });
};
