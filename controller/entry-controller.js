'use strict';

const debug = require('debug')('ramble:entry-controller');
const Entry = require('../model/entry');
const httpErrors = require('http-errors');

exports.createEntry = function(entryData){
  debug('createEntry');
  return new Promise((resolve, reject) => {
    new Entry(entryData).save()
    .then(entry => resolve(entry))
    .catch(err => reject(httpErrors(400, err.message)));
  });
};

exports.fetchEntry = function(id){
  debug('fetchEntry');
  return new Promise((resolve, reject) => {
    Entry.findOne({_id: id})
    .then(resolve)
    .catch(err => reject(httpErrors(404, err.message)));
  });
};

exports.updateEntry = function(id, data){
  debug('updateEntry');
  return new Promise((resolve, reject) => {
    if(!id){
      var err = httpErrors(400, err.message);
      return reject(err);
    }
    if(!data){
      err = httpErrors(400, err.message);
      return reject(err);
    }
    Entry.findOne({_id: id})
  .then(() => {
    Entry.update(data)
    .then(() => {
      Entry.findOne({_id: id})
      .then(resolve)
      .catch(reject);
    })
    .catch(err => reject(httpErrors(400, err.message)));
  })
  .catch(err => reject(httpErrors(404, err.message)));
  });
};

exports.removeEntry = function(id){
  return new Promise((resolve, reject) => {
    Entry.findOne({_id: id})
    .then(() => {
      Entry.remove({_id: id})
        .then(resolve)
        .catch(err => reject(httpErrors(500, err.message)));
    })
    .catch(err => reject(httpErrors(404, err.message)));
  });
};

exports.removeAllEntries = function(){
  return Entry.remove({});
};
