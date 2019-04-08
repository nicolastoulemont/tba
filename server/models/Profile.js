const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
	user_ID: {
		type: String,
		required: true
	},
	organisation_ID: String,
	name: {
		type: String,
		required: true
	},
	position: {
		type: String,
		required: true
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
	picture_URL: {
		type: String,
		default:
			'https://s3.eu-west-3.amazonaws.com/my-eu-development/images/20190408T1704-z6sdtva1fp-default-user-avatar-png'
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

module.exports = mongoose.model('Profile', profileSchema);
