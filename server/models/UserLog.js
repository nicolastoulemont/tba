const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userLogSchema = new Schema({
	user_ID: {
		type: String,
		required: true
	},
	lastLogin: {
		type: Date
	},
	lastLogout: {
		type: Date
	},
	isActive: {
		type: Boolean
	},
	upgradedAccess: {
		type: Date
	},
	downgradedAccess: {
		type: Date
	},
	lastComment: {
		type: Date
	},
	lastEvent: {
		type: Date
	},
	lastLike: {
		type: Date
	},
	lastPoll: {
		type: Date
	},
	lastRegistration: {
		type: Date
	},
	lastReport: {
		type: Date
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

module.exports = mongoose.model('UserLog', userLogSchema);
