const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
	user_ID: {
		type: String,
		required: true
	},
	event_ID: String,
	poll_ID: String,
	text: {
		type: String,
		required: true
	},
	pinned: {
		type: Boolean,
		default: false
	},
	moderated: {
		type: Boolean,
		default: false
	},
	moderationMsg: String,
	createdAt: {
		type: Date,
		default: Date.now()
	},
	updatedAt: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model('Comment', commentSchema);
