const Validator = require('validator');
const { isEmpty } = require('../general');

const validateCommentInput = async data => {
	let errors = [];

	data.text = !isEmpty(data.text) ? data.text : '';

	if (!Validator.isLength(data.text, { min: 1, max: 250 }))
		errors.push({
			path: 'text',
			message: 'Your comment must be between 1 and 250 characters'
		});

	const ValidString = /^[\wáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ?!,€._-\s]+$/;
	const stringRegExp = new RegExp(ValidString);

	if (!data.text.match(stringRegExp))
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
