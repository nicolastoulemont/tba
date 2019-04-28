const Validator = require('validator');
const dayjs = require('dayjs');
const { isEmpty } = require('../general');
const { EventItem } = require('../../models/');

const validateEventInput = async data => {
	let errors = [];

	data.name = !isEmpty(data.name) ? data.name : '';
	data.abstract = !isEmpty(data.abstract) ? data.abstract : '';
	data.description = !isEmpty(data.description) ? data.description : '';
	data.city = !isEmpty(data.city) ? data.city : '';
	data.address = !isEmpty(data.address) ? data.address : '';

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

	if (!Validator.isLength(data.description, { min: 5, max: 2000 }))
		errors.push({
			path: 'description',
			message: 'The event description must be between 5 and 2000 characters'
		});

	if (!Validator.isLength(data.city, { min: 1, max: 70 }))
		errors.push({
			path: 'city',
			message: 'The event city name must be between 1 and 70 characters'
		});

	if (!Validator.isLength(data.address, { min: 1, max: 140 }))
		errors.push({
			path: 'address',
			message: 'The event address must be between 1 and 140 characters'
		});

	if (await EventItem.findOne({ name: data.name }))
		errors.push({
			path: 'name',
			message: 'An event with this name already exist'
		});

	if (!dayjs(data.start).isBefore(dayjs(data.end)))
		errors.push({ path: 'start', message: 'The event start must precede its end' });

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

const validateUpdEventIntput = async data => {
	let errors = [];

	data.name = !isEmpty(data.name) ? data.name : '';
	data.abstract = !isEmpty(data.abstract) ? data.abstract : '';
	data.description = !isEmpty(data.description) ? data.description : '';
	data.city = !isEmpty(data.city) ? data.city : '';
	data.address = !isEmpty(data.address) ? data.address : '';

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

	if (!Validator.isLength(data.description, { min: 5, max: 2000 }))
		errors.push({
			path: 'description',
			message: 'The event description must be between 5 and 2000 characters'
		});

	if (!Validator.isLength(data.city, { min: 1, max: 70 }))
		errors.push({
			path: 'city',
			message: 'The event city name must be between 1 and 70 characters'
		});

	if (!Validator.isLength(data.address, { min: 1, max: 140 }))
		errors.push({
			path: 'address',
			message: 'The event address must be between 1 and 140 characters'
		});

	const usedName = await EventItem.findOne({ name: data.name });
	if (usedName && data._id !== usedName._id) {
		errors.push({
			path: 'name',
			message: 'An event with this name already exist'
		});
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

module.exports = { validateUpdEventIntput, validateEventInput };
