const findEvent = async (args, EventItem) => {
	try {
		const event = await EventItem.findById(args.id);
		return {
			statusCode: 200,
			ok: true,
			errors: null,
			body: event
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

const findEvents = async (args, EventItem) => {
	try {
		const events = await EventItem.find({ isPublic: true })
			.sort({ _id: 'descending' })
			.limit(args.limit);

		return {
			statusCode: 200,
			ok: true,
			errors: null,
			body: events
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

const dailyEventsWithTags = async (date, dayafter, args, EventItem) => {
	try {
		const events = await EventItem.find({
			start: { $gte: date, $lte: dayafter },
			isPublic: true,
			tags: { $in: args.tags },
			type: { $regex: new RegExp(args.type, 'i') },
			price: { $lte: args.price },
			$or: [
				{ name: { $regex: new RegExp(args.search, 'i') } },
				{ abstract: { $regex: new RegExp(args.search, 'i') } }
			]
		})
			.sort({ start: args.sort })
			.limit(args.limit);
		return {
			statusCode: 200,
			ok: true,
			errors: null,
			body: events
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

const dailyEventsWithOutTags = async (date, dayafter, args, EventItem) => {
	try {
		const events = await EventItem.find({
			start: { $gte: date, $lte: dayafter },
			isPublic: true,
			type: { $regex: new RegExp(args.type, 'i') },
			price: { $lte: args.price },
			$or: [
				{ name: { $regex: new RegExp(args.search, 'i') } },
				{ abstract: { $regex: new RegExp(args.search, 'i') } }
			]
		})
			.sort({ start: args.sort })
			.limit(args.limit);
		return {
			statusCode: 200,
			ok: true,
			errors: null,
			body: events
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

const findUserFutureEvents = async (args, EventItem) => {
	const date = new Date(args.date);
	try {
		const events = await EventItem.find({ user_ID: args.user_ID, start: { $gte: date } });
		return {
			statusCode: 200,
			ok: true,
			errors: null,
			body: events
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

const findUserPastEvents = async (args, EventItem) => {
	const date = new Date(args.date);
	try {
		const events = await EventItem.find({ user_ID: args.user_ID, start: { $lte: date } }).sort({
			start: 'descending'
		});
		return {
			statusCode: 200,
			ok: true,
			errors: null,
			body: events
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

const findUserEvents = async (args, EventItem) => {
	try {
		const events = await EventItem.find({ user_ID: args.user_ID });
		return {
			statusCode: 200,
			ok: true,
			errors: null,
			body: events
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
	findEvent,
	findEvents,
	dailyEventsWithOutTags,
	dailyEventsWithTags,
	findUserFutureEvents,
	findUserPastEvents,
	findUserEvents
};
