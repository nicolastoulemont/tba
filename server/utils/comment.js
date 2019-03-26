const { isCommentAuthorOrModerated } = require('../validation/isAuthorized');
const buildComment = async (args, CommentItem) => {
	try {
		return await new CommentItem({
			user_ID: args.user_ID,
			event_ID: args.event_ID,
			comment_ID: args.comment_ID,
			poll_ID: args.poll_ID,
			text: args.text,
			createdAt: new Date(),
			updatedAt: new Date()
		}).save();
	} catch (err) {
		console.log(err);
		return err;
	}
};
const updateComment = async (args, user, CommentItem) => {
	try {
		if (!(await isCommentAuthorOrModerated(args, user, CommentItem)))
			return new Error('You cannot perform this action');
		return await CommentItem.findByIdAndUpdate(
			args._id,
			{
				updatedAt: new Date(),
				text: args.text
			},
			{ new: true }
		);
	} catch (err) {
		console.log(err);
		return null;
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
		if (comment.user_ID === args.user_ID)
			return await CommentItem.findByIdAndUpdate(args._id, deletedComment, {
				new: true
			});
		if (event.user_ID === args.user_ID && comment.user_ID !== args.user_ID)
			return await CommentItem.findByIdAndUpdate(args._id, moderatedComment, {
				new: true
			});
	} catch (err) {
		console.log(err);
	}
};

module.exports = { buildComment, updateComment, moderateComment };
