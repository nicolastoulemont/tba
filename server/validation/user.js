const Validator = require('validator');
const isEmpty = require('./is-empty');
const User = require('../models/User');

const validateRegInput = async data => {
	let errors = [];

	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';

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

const validateUpdateInput = async data => {
	let errors = [];

	data.email = !isEmpty(data.email) ? data.email : '';

	if (!Validator.isEmail(data.email)) {
		let emailError = {
			path: 'email',
			message: 'Email is invalid'
		};
		errors.push(emailError);
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

module.exports = { validateRegInput, validateUpdateInput };
