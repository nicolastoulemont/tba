const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
	user_ID: {
		type: String,
		required: true
	},
	event_ID: String,
	poll_ID: String,
	comment_ID: String,
	profile_ID: String,
	post_ID: String,
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

module.exports = mongoose.model('Report', reportSchema);
