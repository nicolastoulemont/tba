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
const updateComment = async data => {};
const moderateComment = async data => {};

module.exports = { buildComment, updateComment, moderateComment };
