const Validator = require('validator');
const isEmpty = require('./is-empty');
const User = require('../models/User');

const validateProfileInput = async data => {
  let errors = [];

  data.name = !isEmpty(data.name) ? data.name : '';
  data.organisation = !isEmpty(data.organisation) ? data.organisation : '';
  data.position = !isEmpty(data.position) ? data.position : '';
  data.interests = !isEmpty(data.interests) ? data.interests : '';
  data.bio = !isEmpty(data.bio) ? data.bio : '';
  data.twitter = !isEmpty(data.twitter) ? data.twitter : '';
  data.linkedin = !isEmpty(data.linkedin) ? data.linkedin : '';

  if (!Validator.isEmail(data.email)) {
    let emailError = {
      path: 'email',
      message: 'Email is invalid'
    };
    errors.push(emailError);
  }
  if (!Validator.isLength(data.password, { min: 5, max: 25 })) {
    let pwdError = {
      path: 'password',
      message: 'Your password must be between 5 and 25 characters'
    };
    errors.push(pwdError);
  }

  const usedEmail = await User.findOne({ email: data.email });
  if (usedEmail) {
    let usedEmailError = {
      path: 'email',
      message: 'This email adress is already used'
    };
    errors.push(usedEmailError);
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateProfileInput;
