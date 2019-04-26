const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
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
	banner_URL: String,
	description: {
		type: String,
		required: true
	},
	isPublic: {
		type: Boolean,
		default: true,
		required: true
	},
	showComments: {
		type: Boolean,
		default: true,
		required: true
	},
	type: {
		type: String
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	updatedAt: {
		type: Date,
		default: Date.now()
	},
	tags: {
		type: [String]
	}
});

module.exports = mongoose.model('Post', postSchema);
