'use strict';

const debug = require('debug')('ramble:prompt-controller');
const Prompt = require('../model/prompt');
const httpErrors = require('http-errors');

exports.createPrompt = function(promptData) {
  debug('createPrompt');
  return new Promise((resolve, reject) => {
    new Prompt(promptData).save()
    .then((prompt) => {
      resolve(prompt);
    })
    .catch(err => reject(httpErrors(400, err.message)));
  });
};

exports.fetchPrompt = function(id) {
  debug('fetchPrompt');
  return new Promise((resolve, reject) => {
    Prompt.findOne({_id: id})
    .then( prompt => resolve( prompt))
    .catch(err => reject(httpErrors(404, err.message)));
  });
};

exports.fetchAllPrompts = function(){
  debug('fetchAllPrompts');
  return new Promise((resolve, reject) => {
    Prompt.find({})
    .then( prompts => resolve( prompts))
    .catch(err => reject(httpErrors(404, err.message)));
  });
};

exports.updatePrompt = function(id, data) {
  debug('updatePrompt');
  return new Promise((resolve, reject) => {
    if(!id){
      var err = httpErrors(400, err.message);
      return reject(err);
    }
    if(!data){
      err = httpErrors(400, err.message);
      return reject(err);
    }
    Prompt.findOne({_id: id})
  .then(() => {
    Prompt.update(data)
    .then(() => {
      Prompt.findOne({_id: id})
      .then(resolve)
      .catch(reject);
    })
    .catch(err => reject(httpErrors(400, err.message)));
  })
  .catch(err => reject(httpErrors(404, err.message)));
  });
};

exports.removePrompt = function(id) {
  debug('removePrompt');
  return new Promise((resolve, reject) => {
    Prompt.findOne({_id: id})
    .then(() => {
      Prompt.remove({_id: id})
      .then(resolve)
      .catch(err => reject(httpErrors(500, err.message)));
    })
    .catch(err => reject(httpErrors(404, err.message)));
  });
};

exports.removeAllPrompts = function(){
  return Prompt.remove({});
};
