'use strict';

const debug = require('debug')('ramble:challenge-controller');
const Challenge = require('../model/challenge');
const httpErrors = require('http-errors');

//createChallenge
exports.createChallenge = function(challengeData) {
  debug('createChallenge');
  return new new Promise((resolve, reject) => {
    new Challenge(challengeData).save()
    .then((challenge) =>
  });
}

//fetchChallenge

//updateChallenge

//deleteChallenge
