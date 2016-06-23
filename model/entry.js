'use strict';

const mongoose = require('mongoose');

const entrySchema = mongoose.Schema({
  title: {type: String, required: true}
  , keywords: [{type: String}]
  , public: {type: Boolean}
  , publishDate: {type: Date, dafault: Date.now }
  , userId: {type: mongoose.Schema.ObjectId, required: true, ref: 'User'}
  , challengeId: {type: mongoose.Schema.ObjectId, ref:'Challenge'}
});

module.exports = mongoose.model('Entry', entrySchema);
