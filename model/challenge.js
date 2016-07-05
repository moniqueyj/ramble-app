'use strict';

const mongoose = require('mongoose');

const ChallengeSchema = mongoose.Schema({
  content: {type: String, required: true}
  , userId: {type: mongoose.Schema.ObjectId, required: true, ref: 'User'}
});

module.exports = mongoose.model('Challenge', ChallengeSchema);
