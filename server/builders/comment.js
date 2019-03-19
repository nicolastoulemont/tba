const { isCommentAuthorOrModerated } = require('../validation/isAuthorized');
const buildComment = async (args, CommentItem) => {
	try {
		return await new CommentItem({
			userId: args.userId,
			eventId: args.eventId,
			commentId: args.commentId,
			pollId: args.pollId,
			text: args.text
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
		const event = await EventItem.findById(args.eventId);
		if (comment.userId === args.userId)
			return await CommentItem.findByIdAndUpdate(args._id, deletedComment, {
				new: true
			});
		if (event.userId === args.userId && comment.userId !== args.userId)
			return await CommentItem.findByIdAndUpdate(args._id, moderatedComment, {
				new: true
			});
	} catch (err) {
		console.log(err);
	}
};

module.exports = { buildComment, updateComment, moderateComment };
