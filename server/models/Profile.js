const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  organisation: String,
  position: {
    type: String,
    required: true
  },
  interestOne: {
    type: String,
    required: true
  },
  interestTwo: {
    type: String,
    default: 'none'
  },
  interestThree: {
    type: String,
    default: 'none'
  },
  bio: String,
  twitter: String,
  linkedin: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Profile', profileSchema);
