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
			let EventLikedError = {
				path: 'event',
				message: 'You already liked this event'
			};
			errors.push(EventLikedError);
		}
	}

	if (data.comment_ID) {
		const CommentLike = await Like.findOne({
			comment_ID: data.comment_ID,
			user_ID: data.user_ID
		});
		if (CommentLike) {
			let CommentLikedError = {
				path: 'comment',
				message: 'You already liked this comment'
			};
			errors.push(CommentLikedError);
		}
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

module.exports = { ValidateAddLike };
