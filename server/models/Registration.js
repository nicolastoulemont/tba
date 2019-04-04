const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registrationSchema = new Schema({
	user_ID: {
		type: String,
		required: true
	},
	event_ID: {
		type: String,
		required: true
	},
	eventName: {
		type: String,
		required: true
	},
	eventCity: {
		type: String,
		required: true
	},
	eventAddress: {
		type: String,
		required: true
	},
	eventStart: {
		type: Date,
		required: true
	},
	eventEnd: {
		type: Date,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	updatedAt: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model('Registration', registrationSchema);
