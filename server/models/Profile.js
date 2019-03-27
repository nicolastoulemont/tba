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
	picture_URL: String,
	interestOne: {
		type: String,
		default: 'none'
	},
	interestTwo: {
		type: String,
		default: 'none'
	},
	interestThree: {
		type: String,
		default: 'none'
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

module.exports = mongoose.model('Profile', profileSchema);
