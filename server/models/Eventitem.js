const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ispublic: {
    type: Boolean,
    default: true,
    required: true
  },
  categoryOne: {
    type: String,
    require: true
  },
  categoryTwo: {
    type: String,
    default: 'Default'
  },
  categoryThree: {
    type: String,
    default: 'Default'
  },
  location: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  },
  startDate: {
    type: String,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Event', eventSchema);
