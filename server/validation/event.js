const Validator = require('validator');
const isEmpty = require('./is-empty');
const EventItem = require('../models/Eventitem');

const validateEventInput = async data => {
	let errors = [];

	data.name = !isEmpty(data.name) ? data.name : '';
	data.description = !isEmpty(data.description) ? data.description : '';
	data.categoryOne = !isEmpty(data.categoryOne) ? data.categoryOne : '';
	data.categoryTwo = !isEmpty(data.categoryTwo) ? data.categoryTwo : '';
	data.categoryThree = !isEmpty(data.categoryThree) ? data.categoryThree : '';
	data.location = !isEmpty(data.location) ? data.location : '';

	if (!Validator.isLength(data.name, { min: 5, max: 140 })) {
		let nameLengthError = {
			path: 'name',
			message: 'The event name must be between 5 and 140 characters'
		};
		errors.push(nameLengthError);
	}

	if (!Validator.isLength(data.description, { min: 5, max: 2000 })) {
		let descriptionLengthError = {
			path: 'description',
			message: 'The event description must be between 5 and 2000 characters'
		};
		errors.push(descriptionLengthError);
	}

	if (!Validator.isLength(data.categoryOne, { min: 1, max: 15 })) {
		let categoryOneLengthError = {
			path: 'categoryOne',
			message: 'The event  must have a category'
		};
		errors.push(categoryOneLengthError);
	}

	if (!Validator.isLength(data.location, { min: 5, max: 200 })) {
		let locationLengthError = {
			path: 'location',
			message: 'The event location must be between 5 and 200 characters'
		};
		errors.push(locationLengthError);
	}

	const usedName = await EventItem.findOne({ name: data.name });
	if (usedName) {
		let usedNameError = {
			path: 'name',
			message: 'An event with this name already exist'
		};
		errors.push(usedNameError);
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

const validateUpdEventIntput = async data => {
	let errors = [];

	data.name = !isEmpty(data.name) ? data.name : '';
	data.description = !isEmpty(data.description) ? data.description : '';
	data.category = !isEmpty(data.category) ? data.category : '';
	data.location = !isEmpty(data.location) ? data.location : '';

	if (!Validator.isLength(data.name, { min: 5, max: 140 })) {
		let nameLengthError = {
			path: 'name',
			message: 'The event name must be between 5 and 140 characters'
		};
		errors.push(nameLengthError);
	}

	if (!Validator.isLength(data.description, { min: 5, max: 2000 })) {
		let descriptionLengthError = {
			path: 'description',
			message: 'The event description must be between 5 and 2000 characters'
		};
		errors.push(descriptionLengthError);
	}

	if (!Validator.isLength(data.location, { min: 5, max: 200 })) {
		let locationLengthError = {
			path: 'location',
			message: 'The event location must be between 5 and 200 characters'
		};
		errors.push(locationLengthError);
	}

	const usedName = await EventItem.findOne({ name: data.name });
	if (usedName && data._id !== usedName._id) {
		let usedNameError = {
			path: 'name',
			message: 'An event with this name already exist'
		};
		errors.push(usedNameError);
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

module.exports = { validateUpdEventIntput, validateEventInput };
