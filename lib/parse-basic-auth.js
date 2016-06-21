'use strict';

const debug = require('debug')('ramble:parse-basic-auth');
const httpErrors = require('http-errors');

module.exports = function(req, res, next){
  debug('parseBasicAuth');
  if (! req.headers.authorization) {
    return next(httpErrors(401, 'requires authorization header'));
  }
}
