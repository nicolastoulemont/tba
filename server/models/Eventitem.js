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
	city: {
		type: String,
		required: true
	},
	address: {
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
	},
	tags: {
		type: [String]
	}
});

module.exports = mongoose.model('Event', eventSchema);
