const Registration = require('../models/Registration');
const isEmpty = require('./is-empty');

const ValidateAddRegistration = async data => {
  let errors = [];

  if (data.eventId) {
    const EventRegistered = await Registration.findOne({
      eventId: data.eventId,
      userId: data.userId
    });
    if (EventRegistered) {
      let EventRegisteredError = {
        path: 'event',
        message: 'You already registered to this event'
      };
      errors.push(EventRegisteredError);
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = { ValidateAddRegistration };
