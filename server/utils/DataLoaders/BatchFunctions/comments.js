const batchCommentComments = async (ids, { CommentItem }) => {
	const comments = await CommentItem.find({
		comment_ID: { $in: ids }
	});

	const groupComments = comments.reduce((r, a) => {
		r[a.comment_ID] = r[a.comment_ID] || [];
		r[a.comment_ID].push(a);
		return r;
	}, {});

	return ids.map(k => groupComments[k] || []);
};

module.exports = { batchCommentComments };
