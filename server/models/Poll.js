const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pollSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  eventId: {
    type: String,
    required: true
  },
  text: {
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
  }
});

module.exports = mongoose.model('Poll', pollSchema);
