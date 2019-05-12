const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
	user_ID: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	position: {
		type: String,
		required: true
	},
	organisation: {
		type: String
	},
	hideSocial: {
		type: Boolean,
		default: false
	},
	privateProfile: {
		type: Boolean,
		default: false
	},
	bio: String,
	twitter_URL: String,
	linkedin_URL: String,
	website_URL: String,
	picture_URL: String,
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

module.exports = mongoose.model('Profile', profileSchema);
