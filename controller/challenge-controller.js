'use strict';

const debug = require('debug')('ramble:challenge-controller');
const Challenge = require('../model/challenge');
const httpErrors = require('http-errors');

exports.createChallenge = function(challengeData) {
  debug('createChallenge');
  return new Promise((resolve, reject) => {
    new Challenge(challengeData).save()
    .then(challenge => resolve(challenge))
    .catch(err => reject(httpErrors(400, err.message)));
  });
};

exports.fetchChallenge = function(id) {
  debug('fetchChallenge');
  return new Promise((resolve, reject) => {
    Challenge.findOne({_id: id})
    .then(challenge => resolve(challenge))
    .catch(err => reject(httpErrors(404, err.message)));
  });
};

exports.fetchAllChallenges = function(){
  debug('fetchAllChallenges');
  return new Promise((resolve, reject) => {
    Challenge.find({})
    .then(challenges => resolve(challenges))
    .catch(err => reject(httpErrors(404, err.message)));
  });
};

exports.updateChallenge = function(id, data) {
  debug('updateChallenge');
  return new Promise((resolve, reject) => {
    if(!id){
      var err = httpErrors(400, err.message);
      return reject(err);
    }
    if(!data){
      err = httpErrors(400, err.message);
      return reject(err);
    }
    Challenge.findOne({_id: id})
  .then(() => {
    Challenge.update(data)
    .then(() => {
      Challenge.findOne({_id: id})
      .then(resolve)
      .catch(reject);
    })
    .catch(err => reject(httpErrors(400, err.message)));
  })
  .catch(err => reject(httpErrors(404, err.message)));
  });
};

exports.removeChallenge = function(id) {
  debug('removeChallenge');
  return new Promise((resolve, reject) => {
    Challenge.findOne({_id: id})
    .then(() => {
      Challenge.remove({_id: id})
      .then(resolve)
      .catch(err => reject(httpErrors(500, err.message)));
    })
    .catch(err => reject(httpErrors(404, err.message)));
  });
};
