const Validator = require('validator');
const { isEmpty } = require('../general');
const { Organisation } = require('../../models/');

const validateOrgInput = async data => {
	let errors = [];

	data.name = !isEmpty(data.name) ? data.name : '';
	data.description = !isEmpty(data.description) ? data.description : '';
	data.address = !isEmpty(data.address) ? data.address : '';
	data.type = !isEmpty(data.type) ? data.type : '';
	data.registryId = !isEmpty(data.registryId) ? data.registryId : '';

	if (!Validator.isLength(data.name, { min: 5, max: 140 })) {
		let nameLengthError = {
			path: 'name',
			message: 'The organisation name must be between 5 and 140 characters'
		};
		errors.push(nameLengthError);
	}

	if (!Validator.isLength(data.description, { min: 5, max: 2000 })) {
		let descriptionLengthError = {
			path: 'description',
			message: 'The organisation description must be between 5 and 2000 characters'
		};
		errors.push(descriptionLengthError);
	}

	if (!Validator.isLength(data.address, { min: 1, max: 150 })) {
		let addressLengthError = {
			path: 'address',
			message: 'The organisation must have an address between 1 and 150 characters'
		};
		errors.push(addressLengthError);
	}

	if (!Validator.isLength(data.type, { min: 1, max: 50 })) {
		let typeLengthError = {
			path: 'type',
			message: 'The organisation must have a type between 1 and 50 characters'
		};
		errors.push(typeLengthError);
	}

	if (!Validator.isLength(data.registryId, { min: 1, max: 50 })) {
		let registryIdLengthError = {
			path: 'registryId',
			message: 'The EU registry ID  must have a type between 1 and 50 characters'
		};
		errors.push(registryIdLengthError);
	}

	const usedName = await Organisation.findOne({ name: data.name });
	if (usedName) {
		let usedNameError = {
			path: 'name',
			message: 'An organisation with this name already exist'
		};
		errors.push(usedNameError);
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

const validateUpdOrgInput = async data => {
	let errors = [];

	data.name = !isEmpty(data.name) ? data.name : '';
	data.description = !isEmpty(data.description) ? data.description : '';
	data.address = !isEmpty(data.address) ? data.address : '';
	data.type = !isEmpty(data.type) ? data.type : '';
	data.registryId = !isEmpty(data.registryId) ? data.registryId : '';

	if (!Validator.isLength(data.name, { min: 5, max: 140 })) {
		let nameLengthError = {
			path: 'name',
			message: 'The organisation name must be between 5 and 140 characters'
		};
		errors.push(nameLengthError);
	}

	if (!Validator.isLength(data.description, { min: 5, max: 2000 })) {
		let descriptionLengthError = {
			path: 'description',
			message: 'The organisation description must be between 5 and 2000 characters'
		};
		errors.push(descriptionLengthError);
	}

	if (!Validator.isLength(data.address, { min: 5, max: 200 })) {
		let addressLengthError = {
			path: 'address',
			message: 'The organisation address must be between 5 and 200 characters'
		};
		errors.push(addressLengthError);
	}

	if (!Validator.isLength(data.type, { min: 1, max: 50 })) {
		let typeLengthError = {
			path: 'type',
			message: 'The organisation address must be between 1 and 50 characters'
		};
		errors.push(typeLengthError);
	}

	if (!Validator.isLength(data.registryId, { min: 1, max: 50 })) {
		let registryIdLengthError = {
			path: 'registryId',
			message: 'The EU registry ID address must be between 1 and 50 characters'
		};
		errors.push(registryIdLengthError);
	}

	const usedName = await Organisation.findOne({ name: data.name });
	if (usedName && data._id != usedName._id) {
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

module.exports = { validateUpdOrgInput, validateOrgInput };
