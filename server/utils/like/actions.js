const buildLike = async (args, Like) => {
	try {
		let like = await new Like({
			user_ID: args.user_ID,
			event_ID: args.event_ID,
			comment_ID: args.comment_ID,
			poll_ID: args.poll_ID
		}).save();
		return {
			statusCode: 201,
			ok: true,
			errors: null,
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

const deleteLike = async ({ _id, user_ID }, Like) => {
	const like = await Like.findById(_id);
	if (like.user_ID === user_ID) {
		try {
			await Like.findByIdAndDelete(_id);
			return {
				statusCode: 200,
				ok: true
			};
		} catch {
			return {
				statusCode: 404,
				ok: false,
				errors: {
					path: 'Not Found',
					message: 'The server cannot find the requested ressource'
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
};

module.exports = { buildLike, deleteLike };
