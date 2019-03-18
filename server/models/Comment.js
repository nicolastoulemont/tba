const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
	userId: {
		type: String,
		required: true
	},
	eventId: String,
	commentId: String,
	pollId: String,
	text: {
		type: String,
		required: true
	},
	moderated: {
		type: Boolean,
		default: false
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

module.exports = mongoose.model('Comment', commentSchema);
