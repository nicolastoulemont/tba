const { Like } = require('../../models/');
const { isEmpty } = require('../general');

const ValidateAddLike = async data => {
	let errors = [];

	if (data.event_ID) {
		const EventLiked = await Like.findOne({
			event_ID: data.event_ID,
			user_ID: data.user_ID
		});
		if (EventLiked) {
			errors.push({
				path: 'event',
				message: 'You already liked this event'
			});
		}
	}

	if (data.comment_ID) {
		const CommentLike = await Like.findOne({
			comment_ID: data.comment_ID,
			user_ID: data.user_ID
		});
		if (CommentLike) {
			errors.push({
				path: 'comment',
				message: 'You already liked this comment'
			});
		}
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

module.exports = { ValidateAddLike };
