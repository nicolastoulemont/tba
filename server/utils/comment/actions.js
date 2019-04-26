const buildComment = async (args, CommentItem) => {
	try {
		const comment = await new CommentItem({
			user_ID: args.user_ID,
			event_ID: args.event_ID,
			comment_ID: args.comment_ID,
			poll_ID: args.poll_ID,
			text: args.text,
			createdAt: new Date(),
			updatedAt: new Date()
		}).save();

		return {
			statusCode: 201,
			ok: true,
			errors: null,
			body: comment
		};
	} catch (err) {
		return {
			statusCode: 404,
			ok: false,
			errors: {
				path: 'Not Found',
				message: 'The server cannot find the requested ressource'
			}
		};
	}
};
const updateComment = async (args, user, CommentItem) => {
	try {
		const newComment = await CommentItem.findByIdAndUpdate(
			args._id,
			{
				updatedAt: new Date(),
				text: args.text
			},
			{ new: true }
		);
		return {
			statusCode: 201,
			ok: true,
			errors: null,
			body: newComment
		};
	} catch (err) {
		return {
			statusCode: 404,
			ok: false,
			errors: {
				path: 'Not Found',
				message: 'The server cannot find the requested ressource'
			}
		};
	}
};

const moderateComment = async (args, CommentItem, EventItem) => {
	let deletedComment = {
		moderated: true,
		moderationMsg: 'Comment deleted'
	};
	let moderatedComment = {
		moderated: true,
		moderationMsg: 'Comment moderated'
	};
	try {
		const comment = await CommentItem.findById(args._id);
		const event = await EventItem.findById(args.event_ID);

		if (comment.user_ID === args.user_ID) {
			const newComment = await CommentItem.findByIdAndUpdate(args._id, deletedComment, {
				new: true
			});
			return {
				statusCode: 201,
				ok: true,
				errors: null,
				body: newComment
			};
		}

		if (event.user_ID === args.user_ID && comment.user_ID !== args.user_ID) {
			const newComment = await CommentItem.findByIdAndUpdate(args._id, moderatedComment, {
				new: true
			});
			return {
				statusCode: 201,
				ok: true,
				errors: null,
				body: newComment
			};
		}
	} catch (err) {
		return {
			statusCode: 403,
			ok: false,
			errors: {
				path: 'Forbidden',
				message: 'You cannot perform this action'
			}
		};
	}
};

module.exports = { buildComment, updateComment, moderateComment };
