'use strict';

const debug = require('debug')('ramble:handle-error');
const httpErrors = require('http-errors');

module.exports = function(err, req, res, next){
  debug('handleError');
  console.error(err.message);
  if(err.status && err.name){
    res.status(err.status).send(err.name);
    next();
    return;
  }

  err =httpErrors(500, err.message);
  res.status(err.status).send(err.name);
};
