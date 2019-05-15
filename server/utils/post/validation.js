const Validator = require('validator');
const { isEmpty, ValidStringRegExp } = require('../general');
const { Post } = require('../../models/');

const validatePostInput = async data => {
	let errors = [];

	data.name = !isEmpty(data.name) ? data.name : '';
	data.abstract = !isEmpty(data.abstract) ? data.abstract : '';
	data.authorName = !isEmpty(data.authorName) ? data.authorName : '';
	data.author_URL = !isEmpty(data.author_URL) ? data.author_URL : '';
	data.postOrigin_URL = !isEmpty(data.postOrigin_URL) ? data.postOrigin_URL : '';
	data.description = !isEmpty(data.description) ? data.description : '';

	if (!Validator.isLength(data.name, { min: 5, max: 140 }))
		errors.push({
			path: 'name',
			message: 'The event name must be between 5 and 140 characters'
		});

	if (!Validator.isLength(data.abstract, { min: 5, max: 280 }))
		errors.push({
			path: 'abstract',
			message: 'The event abstract must be between 5 and 280 characters'
		});

	if (!Validator.isLength(data.authorName, { min: 1, max: 140 }))
		errors.push({
			path: 'authorname',
			message: 'The author name must be between 1 and 140 characters'
		});

	if (!Validator.isLength(data.author_URL, { min: 1, max: 280 }))
		errors.push({
			path: 'author_URL',
			message: 'The author URL must be between 1 and 280 characters'
		});

	if (!Validator.isLength(data.postOrigin_URL, { min: 1, max: 280 }))
		errors.push({
			path: 'postorigin_URL',
			message: 'The post origin URL must be between 1 and 280 characters'
		});

	if (!Validator.isLength(data.description, { min: 5, max: 2000 }))
		errors.push({
			path: 'description',
			message: 'The event description must be between 5 and 2000 characters'
		});

	if (!Validator.isLength(data.type, { min: 0, max: 30 }))
		errors.push({
			path: 'type',
			message: 'The event address must be between 0 and 30 characters'
		});

	if (!data.name.match(ValidStringRegExp))
		errors.push({
			path: 'name',
			message: 'Only alphanumeric characters are accepted'
		});
	if (!data.abstract.match(ValidStringRegExp))
		errors.push({
			path: 'abstract',
			message: 'Only alphanumeric characters are accepted'
		});
	if (!data.authorName.match(ValidStringRegExp))
		errors.push({
			path: 'authorname',
			message: 'Only alphanumeric characters are accepted'
		});
	if (!data.description.match(ValidStringRegExp))
		errors.push({
			path: 'description',
			message: 'Only alphanumeric characters are accepted'
		});

	if (!data.type === 'institutional' || !data.type === '')
		errors.push({
			path: 'type',
			message: 'Invalid post type'
		});

	if (data.author_URL !== '' && !Validator.isURL(data.author_URL))
		errors.push({
			path: 'author_URL',
			message: 'The author URL must be a valid URL'
		});

	if (data.postOrigin_URL !== '' && !Validator.isURL(data.postOrigin_URL))
		errors.push({
			path: 'postOrigin_URL',
			message: 'The post origin URL  must be a valid URL'
		});

	if (await Post.findOne({ name: data.name }))
		errors.push({
			path: 'name',
			message: 'A Post with this name already exist'
		});

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

const validateUpdPostIntput = async data => {
	let errors = [];

	data.name = !isEmpty(data.name) ? data.name : '';
	data.abstract = !isEmpty(data.abstract) ? data.abstract : '';
	data.authorName = !isEmpty(data.authorName) ? data.authorName : '';
	data.author_URL = !isEmpty(data.author_URL) ? data.author_URL : '';
	data.postOrigin_URL = !isEmpty(data.postOrigin_URL) ? data.postOrigin_URL : '';
	data.description = !isEmpty(data.description) ? data.description : '';

	if (!Validator.isLength(data.name, { min: 5, max: 140 }))
		errors.push({
			path: 'name',
			message: 'The event name must be between 5 and 140 characters'
		});

	if (!Validator.isLength(data.abstract, { min: 5, max: 280 }))
		errors.push({
			path: 'abstract',
			message: 'The event abstract must be between 5 and 280 characters'
		});

	if (!Validator.isLength(data.authorName, { min: 1, max: 140 }))
		errors.push({
			path: 'authorname',
			message: 'The author name must be between 1 and 140 characters'
		});

	if (!Validator.isLength(data.author_URL, { min: 1, max: 280 }))
		errors.push({
			path: 'author_URL',
			message: 'The author URL must be between 1 and 280 characters'
		});

	if (!Validator.isLength(data.postOrigin_URL, { min: 1, max: 280 }))
		errors.push({
			path: 'postorigin_URL',
			message: 'The post origin URL must be between 1 and 280 characters'
		});

	if (!Validator.isLength(data.description, { min: 5, max: 2000 }))
		errors.push({
			path: 'description',
			message: 'The event description must be between 5 and 2000 characters'
		});

	if (!Validator.isLength(data.type, { min: 0, max: 30 }))
		errors.push({
			path: 'type',
			message: 'The event address must be between 0 and 30 characters'
		});

	if (!data.name.match(ValidStringRegExp))
		errors.push({
			path: 'name',
			message: 'Only alphanumeric characters are accepted'
		});
	if (!data.abstract.match(ValidStringRegExp))
		errors.push({
			path: 'abstract',
			message: 'Only alphanumeric characters are accepted'
		});
	if (!data.authorName.match(ValidStringRegExp))
		errors.push({
			path: 'authorname',
			message: 'Only alphanumeric characters are accepted'
		});
	if (!data.description.match(ValidStringRegExp))
		errors.push({
			path: 'description',
			message: 'Only alphanumeric characters are accepted'
		});

	if (!data.type === 'institutional' || !data.type === '')
		errors.push({
			path: 'type',
			message: 'Invalid post type'
		});

	if (data.author_URL !== '' && !Validator.isURL(data.author_URL))
		errors.push({
			path: 'author_URL',
			message: 'The author URL must be a valid URL'
		});

	if (data.postOrigin_URL !== '' && !Validator.isURL(data.postOrigin_URL))
		errors.push({
			path: 'postOrigin_URL',
			message: 'The post origin URL  must be a valid URL'
		});

	const usedName = await Post.findOne({ name: data.name });
	if (usedName && !data._id === usedName._id) {
		errors.push({
			path: 'name',
			message: 'A Post with this name already exist'
		});
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

module.exports = { validateUpdPostIntput, validatePostInput };
