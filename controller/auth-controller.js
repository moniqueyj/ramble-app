'use strict';

const debug = require('debug')('ramble:auth-controller');
const User = require('../model/user');
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
    .then(user => user.compareHash(auth.password))
    .then(user => user.generateToken())
    .then(token => resolve(token))
    .catch(reject);
  });
};

exports.updatePassword = function(auth, reqBody){
  debug('updateSignin');
  var password = reqBody.password;
  delete reqBody.password;
  return new Promise((resolve, reject) => {
    User.findOne({username:auth.username})
    .then(user => user.compareHash(auth.password))
    .then(user => user.generateHash(password))
    .then(user => user.save())
    .then(user => user.generateToken())
    .then(token => resolve(token))
    .catch(reject);
  });
};

exports.deleteUser = function(auth, res){
  debug('deleteUser');
  return new Promise((resolve, reject) => {
    User.findOne({username:auth.username})
    .then(user => user.compareHash(auth.password))
    .then(user => user.remove(auth.username))
    .then(() =>res.status())
    .catch(reject);
  });
};
