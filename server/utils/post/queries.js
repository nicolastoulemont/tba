const findPost = async (args, Post) => {
	try {
		const post = await Post.findById(args.id);
		return {
			statusCode: 200,
			ok: true,
			errors: null,
			body: post
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

const findPosts = async (args, Post) => {
	try {
		const posts = await Post.find({})
			.sort({ _id: 'descending' })
			.limit(args.limit);

		return {
			statusCode: 200,
			ok: true,
			errors: null,
			body: posts
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

const dailyPostsWithTags = async (date, dayafter, args, Post) => {
	try {
		const posts = await Post.find({
			createdAt: { $gte: date, $lte: dayafter },
			tags: { $in: args.tags },
			type: { $regex: new RegExp(args.type, 'i') },
			$or: [
				{ name: { $regex: new RegExp(args.search, 'i') } },
				{ abstract: { $regex: new RegExp(args.search, 'i') } }
			]
		})
			.sort({ createdAt: args.sort })
			.limit(args.limit);

		return {
			statusCode: 200,
			ok: true,
			errors: null,
			body: posts
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

const dailyPostsWithOutTags = async (date, dayafter, args, Post) => {
	try {
		const posts = await Post.find({
			createdAt: { $gte: date, $lte: dayafter },
			type: { $regex: new RegExp(args.type, 'i') },
			$or: [
				{ name: { $regex: new RegExp(args.search, 'i') } },
				{ abstract: { $regex: new RegExp(args.search, 'i') } }
			]
		})
			.sort({ createdAt: args.sort })
			.limit(args.limit);
		return {
			statusCode: 200,
			ok: true,
			errors: null,
			body: posts
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

const searchUserPosts = async (date, dayafter, args, Post) => {
	try {
		const posts = await Post.find({
			user_ID: args.user_ID,
			createdAt: { $gte: date, $lte: dayafter },
			$or: [
				{ name: { $regex: new RegExp(args.search, 'i') } },
				{ abstract: { $regex: new RegExp(args.search, 'i') } }
			]
		})
			.sort({ createdAt: args.sort })
			.limit(args.limit);
		return {
			statusCode: 200,
			ok: true,
			errors: null,
			body: posts
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

const findUserPosts = async (args, Post) => {
	try {
		const posts = await Post.find({ user_ID: args.user_ID });
		return {
			statusCode: 200,
			ok: true,
			errors: null,
			body: posts
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

module.exports = {
	findPost,
	findPosts,
	dailyPostsWithOutTags,
	dailyPostsWithTags,
	searchUserPosts,
	findUserPosts
};
