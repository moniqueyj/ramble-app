'use strict';

const mongoose = require('mongoose');

const entrySchema = mongoose.Schema({
  username: {type: String, required: true, unique: true}
  , title: {type: String, required: true}
  , author: {type: String}
  , keywords: [{type: String}]
  , public: {type: Boolean}
  , publishDate: {type: Date, dafault: Date.now }
  , userId: {type: mongoose.Schema.ObjectId, required: true, ref: 'User'}

});

module.exports = mongoose.model('Entry', entrySchema);
