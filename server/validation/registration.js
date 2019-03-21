const Registration = require('../models/Registration');
const isEmpty = require('./is-empty');

const ValidateAddRegistration = async data => {
  let errors = [];

  if (data.event_ID) {
    const EventRegistered = await Registration.findOne({
      event_ID: data.event_ID,
      user_ID: data.user_ID
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
