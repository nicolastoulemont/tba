const findComment = async (args, CommentItem) => {
	try {
		const comment = await CommentItem.findById(args.id);
		return {
			statusCode: 200,
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

const findComments = async (args, CommentItem) => {
	try {
		const comments = await CommentItem.find({});
		return {
			statusCode: 200,
			ok: true,
			errors: null,
			body: comments
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

const findEventComments = async (args, CommentItem) => {
	try {
		const comments = await CommentItem.find({ event_ID: args.event_ID });
		return {
			statusCode: 200,
			ok: true,
			errors: null,
			body: comments
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

const findCommentComments = async (args, CommentItem) => {
	try {
		const comments = await CommentItem.find({ comment_ID: args.comment_ID });
		return {
			statusCode: 200,
			ok: true,
			errors: null,
			body: comments
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

module.exports = { findComment, findComments, findEventComments, findCommentComments };
