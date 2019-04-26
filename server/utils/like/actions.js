const buildLike = async (args, Like) => {
	try {
		let like = await new Like({
			user_ID: args.user_ID,
			event_ID: args.event_ID,
			comment_ID: args.comment_ID,
			poll_ID: args.poll_ID
		}).save();
		return { success: true, like };
	} catch (err) {
		console.log(err);
	}
};

const deleteLike = async ({ _id, user_ID }, Like) => {
	try {
		const like = await Like.findById(_id);
		if (like.user_ID === user_ID) return await Like.findByIdAndDelete(_id);
	} catch (err) {
		console.log(err);
	}
};

module.exports = { buildLike, deleteLike };
