const Validator = require('validator');
const { isEmpty } = require('../general');

const validateCommentInput = async data => {
	let errors = [];

	data.text = !isEmpty(data.text) ? data.text : '';

	if (!Validator.isLength(data.text, { min: 1, max: 250 })) {
		let textLengthError = {
			path: 'text',
			message: 'Your comment must be between 1 and 250 characters'
		};
		errors.push(textLengthError);
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

module.exports = { validateCommentInput };
