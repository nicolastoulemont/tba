const buildEvent = async (args, EventItem) => {
	try {
		let event = await new EventItem({
			user_ID: args.user_ID,
			name: args.name,
			abstract: args.abstract,
			banner_URL: args.banner_URL,
			description: args.description,
			isPublic: args.isPublic,
			hasComments: args.hasComments,
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
			success: true,
			event
		};
	} catch (err) {
		console.log(err);
		return {
			success: false,
			errors: [err]
		};
	}
};

const updateEvent = async (args, EventItem) => {
	try {
		let updateEvent = {};
		if (args.name) updateEvent.name = args.name;
		if (args.abstract) updateEvent.abstract = args.abstract;
		if (typeof args.banner_URL !== null) updateEvent.banner_URL = args.banner_URL;
		if (args.description) updateEvent.description = args.description;
		if (typeof args.isPublic !== null) updateEvent.isPublic = args.isPublic;
		if (typeof args.hasComments !== null) updateEvent.hasComments = args.hasComments;
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
		return { success: true, event: updEvent };
	} catch (err) {
		console.log(err);
		return {
			success: false,
			errors: { path: 'save', message: 'Something went wrong' }
		};
	}
};

module.exports = { buildEvent, updateEvent };
