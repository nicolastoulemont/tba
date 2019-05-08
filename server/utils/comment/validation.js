const { isEmpty, ValidStringRegExp } = require('../general');

const validateCommentInput = async data => {
	let errors = [];

	data.text = !isEmpty(data.text) ? data.text : '';

	if (data.text.length < 1 || data.text.length > 250)
		errors.push({
			path: 'text',
			message: 'Your comment must be between 1 and 250 characters'
		});

	if (!data.text.match(ValidStringRegExp))
		errors.push({
			path: 'text',
			message: 'Only alphanumeric characters are accepted'
		});

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

module.exports = { validateCommentInput };
