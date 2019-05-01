const findLike = async (args, Like) => {
	try {
		const like = await Like.findById(args.id);
		return {
			statusCode: 200,
			ok: true,
			body: like
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

const findLikes = async (args, Like) => {
	try {
		const likes = await Like.find({});
		return {
			statusCode: 200,
			ok: true,
			body: likes
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

const findEventLikes = async (args, Like) => {
	try {
		const likes = await Like.find({ event_ID: args.event_ID });
		return {
			statusCode: 200,
			ok: true,
			body: likes
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

const findCommentLikes = async (args, Like) => {
	try {
		const likes = await Like.find({ comment_ID: args.comment_ID });
		return {
			statusCode: 200,
			ok: true,
			body: likes
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

findUserLikes = async (args, Like) => {
	try {
		const likes = await Like.find({ user_ID: args.user_ID });
		return {
			statusCode: 200,
			ok: true,
			body: likes
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

module.exports = { findLike, findLikes, findEventLikes, findCommentLikes, findUserLikes };
