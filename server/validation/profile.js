const Validator = require('validator');
const isEmpty = require('./is-empty');
const User = require('../models/User');

// TODO

const validateProfileInput = async data => {
	let errors = [];

	data.organisation_ID = !isEmpty(data.organisation_ID) ? data.organisation_ID : '';
	data.name = !isEmpty(data.name) ? data.name : '';
	data.position = !isEmpty(data.position) ? data.position : '';
	data.bio = !isEmpty(data.bio) ? data.bio : '';
	data.twitter_URL = !isEmpty(data.twitter_URL) ? data.twitter_URL : '';
	data.linkedin_URL = !isEmpty(data.linkedin_URL) ? data.linkedin_URL : '';
	data.picture_URL = !isEmpty(data.picture_URL) ? data.picture_URL : '';
	data.interests = !isEmpty(data.interests) ? data.interests : '';

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
