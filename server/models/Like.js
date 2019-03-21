const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
	user_ID: {
		type: String,
		required: true
	},
	event_ID: String,
	poll_ID: String,
	comment_ID: String,
	createdAt: {
		type: Date,
		default: Date.now()
	},
	updatedAt: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model('Like', likeSchema);
