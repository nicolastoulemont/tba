const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		lowercase: true,
		trim: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	access: {
		type: String,
		default: 'basic',
		required: true
	},
	verified: {
		type: Boolean,
		default: false
	},
	acceptedTerms: {
		type: Boolean,
		default: false
	},
	tokenCount: {
		type: Number,
		default: 0
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

module.exports = mongoose.model('User', userSchema);
