const buildPost = async (args, Post) => {
	try {
		let post = await new Post({
			user_ID: args.user_ID,
			name: args.name,
			abstract: args.abstract,
			description: args.description,
			authorName: args.authorName,
			author_URL: args.author_URL,
			postOrigin_URL: args.postOrigin_URL,
			type: args.type,
			scraped: args.scraped,
			createdAt: new Date(),
			updatedAt: new Date(),
			tags: args.tags
		}).save();

		return {
			statusCode: 201,
			ok: true,
			errors: null,
			body: post
		};
	} catch (err) {
		return {
			statusCode: 500,
			ok: false,
			errors: {
				path: 'Internal server error',
				message: 'The server failed to execute the requested action'
			}
		};
	}
};

const updatePost = async (args, Post) => {
	try {
		let updatePost = {};
		if (args.name) updatePost.name = args.name;
		if (args.abstract) updatePost.abstract = args.abstract;
		if (args.description) updatePost.description = args.description;
		if (args.authorName) updatePost.authorName = args.authorName;
		if (args.author_URL) updatePost.author_URL = args.author_URL;
		if (args.postOrigin_URL) updatePost.postOrigin_URL = args.postOrigin_URL;
		if (args.type) updatePost.type = args.type;
		if (typeof args.scraped !== null) updatePost.scraped = args.scraped;
		if (args.tags) updatePost.tags = args.tags;
		updatePost.updatedAt = new Date();

		const updPost = await Post.findOneAndUpdate({ _id: args._id }, updatePost, {
			new: true
		});

		return {
			statusCode: 201,
			ok: true,
			errors: null,
			body: updPost
		};
	} catch (err) {
		return {
			statusCode: 500,
			ok: false,
			errors: {
				path: 'Internal server error',
				message: 'The server failed to execute the requested action'
			}
		};
	}
};

const deletePost = async (args, Post) => {
	try {
		const post = await Post.findById(args._id);
		if (post.user_ID === args.user_ID) {
			try {
				await Post.findByIdAndDelete(args._id);
				return {
					statusCode: 200,
					ok: true
				};
			} catch {
				return {
					statusCode: 500,
					ok: false,
					errors: {
						path: 'Internal server error',
						message: 'The server failed to execute the requested action'
					}
				};
			}
		} else {
			return {
				statusCode: 403,
				ok: false,
				errors: {
					path: 'Forbidden',
					message: 'You cannot perform this action'
				}
			};
		}
	} catch (err) {
		return {
			statusCode: 500,
			ok: false,
			errors: {
				path: 'Internal server error',
				message: 'The server failed to execute the requested action'
			}
		};
	}
};

module.exports = { buildPost, updatePost, deletePost };
