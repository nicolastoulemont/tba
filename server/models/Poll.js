const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pollSchema = new Schema({
	user_ID: {
		type: String,
		required: true
	},
	event_ID: {
		type: String,
		required: true
	},
	text: {
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
	}
});

module.exports = mongoose.model('Poll', pollSchema);
