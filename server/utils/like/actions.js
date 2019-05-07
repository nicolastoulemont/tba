const buildLike = async (args, Like, EventItem) => {
	try {
		let like = await new Like({
			user_ID: args.user_ID,
			event_ID: args.event_ID,
			comment_ID: args.comment_ID,
			poll_ID: args.poll_ID
		}).save();

		if (args.event_ID) {
			await EventItem.findOneAndUpdate(
				{ _id: args.event_ID },
				{ $inc: { likesCount: 1 } },
				{ new: true }
			);
		}

		return {
			statusCode: 201,
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

const deleteLike = async (args, Like, EventItem) => {
	const like = await Like.findById(args._id);
	if (like.user_ID === args.user_ID) {
		try {
			await Like.findByIdAndDelete(args._id);
			if (args.event_ID) {
				await EventItem.findOneAndUpdate(
					{ _id: args.event_ID },
					{ $inc: { likesCount: -1 } },
					{ new: true }
				);
			}

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
