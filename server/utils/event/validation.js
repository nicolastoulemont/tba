const Validator = require('validator');
const dayjs = require('dayjs');
const { isEmpty, ValidStringRegExp } = require('../general');
const { EventItem } = require('../../models/');

const validateEventInput = async data => {
	let errors = [];

	data.name = !isEmpty(data.name) ? data.name : '';
	data.abstract = !isEmpty(data.abstract) ? data.abstract : '';
	data.eventHost = !isEmpty(data.eventHost) ? data.eventHost : '';
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

	if (!Validator.isLength(data.eventHost, { min: 1, max: 70 }))
		errors.push({
			path: 'eventhost',
			message: 'The event host must be between 1 and 70 characters'
		});

	if (!Validator.isLength(data.description, { min: 5, max: 2000 }))
		errors.push({
			path: 'description',
			message: 'The event description must be between 5 and 2000 characters'
		});

	if (!Validator.isLength(data.city, { min: 1, max: 30 }))
		errors.push({
			path: 'city',
			message: 'The event city name must be between 1 and 30 characters'
		});

	if (!Validator.isLength(data.address, { min: 1, max: 70 }))
		errors.push({
			path: 'address',
			message: 'The event address must be between 1 and 70 characters'
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
	if (!data.eventHost.match(ValidStringRegExp))
		errors.push({
			path: 'eventhost',
			message: 'Only alphanumeric characters are accepted'
		});
	if (!data.description.match(ValidStringRegExp))
		errors.push({
			path: 'description',
			message: 'Only alphanumeric characters are accepted'
		});
	if (!data.city.match(ValidStringRegExp))
		errors.push({
			path: 'city',
			message: 'Only alphanumeric characters are accepted'
		});
	if (!data.address.match(ValidStringRegExp))
		errors.push({
			path: 'address',
			message: 'Only alphanumeric characters are accepted'
		});

	if (!data.type === 'institutional' || !data.type === '')
		errors.push({
			path: 'type',
			message: 'Invalid event type'
		});

	if (await EventItem.findOne({ name: data.name }))
		errors.push({
			path: 'name',
			message: 'An event with this name already exist'
		});

	if (!dayjs(data.start).isValid())
		errors.push({
			path: 'start',
			message: 'Invalid start date'
		});
	if (!dayjs(data.end).isValid())
		errors.push({
			path: 'end',
			message: 'Invalid end date'
		});

	if (!dayjs(data.start).isBefore(dayjs(data.end)) || dayjs(data.start).isSame(dayjs(data.end)))
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
	data.eventHost = !isEmpty(data.eventHost) ? data.eventHost : '';
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

	if (!Validator.isLength(data.eventHost, { min: 1, max: 70 }))
		errors.push({
			path: 'eventhost',
			message: 'The event host must be between 1 and 70 characters'
		});

	if (!Validator.isLength(data.description, { min: 5, max: 2000 }))
		errors.push({
			path: 'description',
			message: 'The event description must be between 5 and 2000 characters'
		});

	if (!Validator.isLength(data.city, { min: 1, max: 30 }))
		errors.push({
			path: 'city',
			message: 'The event city name must be between 1 and 30 characters'
		});

	if (!Validator.isLength(data.address, { min: 1, max: 140 }))
		errors.push({
			path: 'address',
			message: 'The event address must be between 1 and 140 characters'
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

	if (!data.eventHost.match(ValidStringRegExp))
		errors.push({
			path: 'eventhost',
			message: 'Only alphanumeric characters are accepted'
		});
	if (!data.description.match(ValidStringRegExp))
		errors.push({
			path: 'description',
			message: 'Only alphanumeric characters are accepted'
		});
	if (!data.city.match(ValidStringRegExp))
		errors.push({
			path: 'city',
			message: 'Only alphanumeric characters are accepted'
		});
	if (!data.address.match(ValidStringRegExp))
		errors.push({
			path: 'address',
			message: 'Only alphanumeric characters are accepted'
		});

	if (!data.type === 'institutional' || !data.type === '')
		errors.push({
			path: 'type',
			message: 'Invalid event type'
		});

	const usedName = await EventItem.findOne({ name: data.name });
	if (usedName && !data._id === usedName._id) {
		errors.push({
			path: 'name',
			message: 'An event with this name already exist'
		});
	}

	if (!dayjs(data.start).isValid())
		errors.push({
			path: 'start',
			message: 'Invalid start date'
		});
	if (!dayjs(data.end).isValid())
		errors.push({
			path: 'end',
			message: 'Invalid end date'
		});

	if (!dayjs(data.start).isBefore(dayjs(data.end)) || dayjs(data.start).isSame(dayjs(data.end)))
		errors.push({ path: 'start', message: 'The event start must precede its end' });

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

module.exports = { validateUpdEventIntput, validateEventInput };
