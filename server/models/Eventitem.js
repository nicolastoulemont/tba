const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
	user_ID: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	abstract: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	isPublic: {
		type: Boolean,
		default: true,
		required: true
	},
	categoryOne: {
		type: String,
		require: true
	},
	categoryTwo: {
		type: String,
		default: 'Default'
	},
	categoryThree: {
		type: String,
		default: 'Default'
	},
	location: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	updatedAt: {
		type: Date,
		default: Date.now()
	},
	start: {
		type: Date,
		required: true
	},
	end: {
		type: Date,
		required: true
	}
});

module.exports = mongoose.model('Event', eventSchema);
