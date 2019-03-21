const isAuthorized = async (args, user, User) => {
	try {
		const reqAuthor = await User.findOne({ _id: user.user.id });
		const reqTarget = await User.findOne({ _id: args._id });
		if (reqAuthor.email == reqTarget.email) return true;
		else return false;
	} catch (err) {
		console.log(err);
		return err;
	}
};

const isCommentAuthorOrModerated = async (args, user, CommentItem) => {
	const comment = await CommentItem.findById(args._id);
	if (comment.moderated) return false;
	if (comment.user_ID === user.user.id) return true;
	return false;
};

module.exports = { isAuthorized, isCommentAuthorOrModerated };
