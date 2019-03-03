const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const membershipSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  organisationId: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  },
  accepted: {
    type: Boolean,
    default: false
  },
  pending: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Membership', membershipSchema);
