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
	description: {
		type: String,
		required: true
	},
	authorName: {
		type: String,
		required: true
	},
	author_URL: {
		type: String,
		required: true
	},
	authorPicture_URL: {
		type: String,
		required: true
	},
	postOrigin_URL: {
		type: String,
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
	scraped: {
		type: Boolean,
		default: false,
		required: true
	},
	tags: {
		type: [String]
	}
});

module.exports = mongoose.model('Post', postSchema);
