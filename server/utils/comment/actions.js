const buildComment = async (args, CommentItem) => {
	try {
		const comment = await new CommentItem({
			user_ID: args.user_ID,
			event_ID: args.event_ID,
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

const pinComment = async (args, CommentItem, EventItem) => {
	try {
		const event = await EventItem.findById(args.event_ID);
		if (event.user_ID === args.user_ID) {
			if (!args.pinned) {
				const comment = await CommentItem.findByIdAndUpdate(
					args._id,
					{ pinned: true },
					{
						new: true
					}
				);
				return {
					statusCode: 201,
					ok: true,
					errors: null,
					body: comment
				};
			} else if (args.pinned) {
				const comment = await CommentItem.findByIdAndUpdate(
					args._id,
					{ pinned: false },
					{
						new: true
					}
				);
				return {
					statusCode: 201,
					ok: true,
					errors: null,
					body: comment
				};
			}
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

const moderateComment = async (args, CommentItem, EventItem) => {
	try {
		const comment = await CommentItem.findById(args._id);
		const event = await EventItem.findById(args.event_ID);

		if (comment.user_ID === args.user_ID) {
			const newComment = await CommentItem.findByIdAndUpdate(
				args._id,
				{
					moderated: true,
					moderationMsg: 'Comment deleted'
				},
				{
					new: true
				}
			);
			return {
				statusCode: 201,
				ok: true,
				errors: null,
				body: newComment
			};
		}

		if (event.user_ID === args.user_ID && comment.user_ID !== args.user_ID) {
			const newComment = await CommentItem.findByIdAndUpdate(
				args._id,
				{
					moderated: true,
					moderationMsg: 'Comment moderated'
				},
				{
					new: true
				}
			);
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

const moderateAndDelete = async (args, CommentItem, EventItem, Report) => {
	try {
		const comment = await CommentItem.findById(args._id);
		const event = await EventItem.findById(args.event_ID);

		if (comment.user_ID === args.user_ID) {
			const newComment = await CommentItem.findByIdAndUpdate(
				args._id,
				{
					moderated: true,
					moderationMsg: 'Comment deleted'
				},
				{
					new: true
				}
			);

			await Report.findByIdAndDelete(args.report_ID);
			return {
				statusCode: 201,
				ok: true,
				errors: null,
				body: newComment
			};
		}

		if (event.user_ID === args.user_ID && comment.user_ID !== args.user_ID) {
			const newComment = await CommentItem.findByIdAndUpdate(
				args._id,
				{
					moderated: true,
					moderationMsg: 'Comment moderated'
				},
				{
					new: true
				}
			);

			await Report.findByIdAndDelete(args.report_ID);
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

module.exports = { buildComment, updateComment, pinComment, moderateComment, moderateAndDelete };
