const Validator = require('validator');
const isEmpty = require('../general');

const validateProfileInput = async data => {
	let errors = [];

	data.name = !isEmpty(data.name) ? data.name : '';
	data.position = !isEmpty(data.position) ? data.position : '';
	data.bio = !isEmpty(data.bio) ? data.bio : '';
	data.twitter_URL = !isEmpty(data.twitter_URL) ? data.twitter_URL : '';
	data.linkedin_URL = !isEmpty(data.linkedin_URL) ? data.linkedin_URL : '';

	if (!Validator.isLength(data.name, { min: 1, max: 70 }))
		errors.push({
			path: 'name',
			message: 'Your name must be between 1 and 70 characters'
		});

	if (!Validator.isLength(data.position, { min: 1, max: 70 }))
		errors.push({
			path: 'position',
			message: 'Your position must be between 1 and 70 characters'
		});

	if (!Validator.isLength(data.bio, { min: 0, max: 280 }))
		errors.push({
			path: 'bio',
			message: 'Your bio must be between 0 and 280 characters'
		});

	if (!Validator.isURL(data.twitter_URL))
		errors.push({
			path: 'twitter_URL',
			message: 'Your twitter URL must be a valid URL'
		});

	if (!Validator.isURL(data.linkedin_URL))
		errors.push({
			path: 'linkedin_URL',
			message: 'Your linkedin URL must be a valid URL'
		});

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

module.exports = validateProfileInput;
