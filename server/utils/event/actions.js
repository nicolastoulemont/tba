const buildEvent = async (args, EventItem) => {
	try {
		let event = await new EventItem({
			user_ID: args.user_ID,
			name: args.name,
			abstract: args.abstract,
			eventHost: args.eventHost,
			banner_URL: args.banner_URL,
			description: args.description,
			isPublic: args.isPublic,
			showComments: args.showComments,
			type: args.type,
			price: args.price,
			city: args.city,
			address: args.address,
			start: new Date(args.start),
			end: new Date(args.end),
			createdAt: new Date(),
			updatedAt: new Date(),
			tags: args.tags
		}).save();
		return {
			statusCode: 201,
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

const updateEvent = async (args, EventItem) => {
	try {
		let updateEvent = {};
		if (args.name) updateEvent.name = args.name;
		if (args.abstract) updateEvent.abstract = args.abstract;
		if (args.eventHost) updateEvent.eventHost = args.eventHost;
		if (typeof args.banner_URL !== null) updateEvent.banner_URL = args.banner_URL;
		if (args.description) updateEvent.description = args.description;
		if (typeof args.isPublic !== null) updateEvent.isPublic = args.isPublic;
		if (typeof args.showComments !== null) updateEvent.showComments = args.showComments;
		if (args.type) updateEvent.type = args.type;
		if (args.price) updateEvent.price = args.price;
		if (args.city) updateEvent.city = args.city;
		if (args.address) updateEvent.address = args.address;
		if (args.start) updateEvent.start = new Date(args.start);
		if (args.end) updateEvent.end = new Date(args.end);
		if (args.tags) updateEvent.tags = args.tags;
		updateEvent.updatedAt = new Date();

		const updEvent = await EventItem.findOneAndUpdate({ _id: args._id }, updateEvent, {
			new: true
		});
		return {
			statusCode: 201,
			ok: true,
			errors: null,
			body: updEvent
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

const deleteEvent = async (args, EventItem) => {
	try {
		const event = await EventItem.findById(args._id);
		if (event.user_ID === args.user_ID) {
			try {
				await EventItem.findByIdAndDelete(args._id);
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

module.exports = { buildEvent, updateEvent, deleteEvent };
