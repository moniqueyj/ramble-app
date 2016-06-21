'use strict';

const debug = require('debug')('ramble:parse-bearer-auth');
const httpErrors = require('http-errors');
const jwt = require('jsonwebtoken');
