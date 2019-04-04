const buildEvent = async (args, EventItem) => {
	try {
		let event = await new EventItem({
			user_ID: args.user_ID,
			name: args.name,
			abstract: args.abstract,
			description: args.description,
			isPublic: args.isPublic,
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
		if (args.description) updateEvent.description = args.description;
		if (args.isPublic) updateEvent.isPublic = args.isPublic;
		if (args.city) updateEvent.city = args.city;
		if (args.address) updateEvent.address = args.address;
		if (args.start) updateEvent.start = new Date(args.start);
		if (args.end) updateEvent.end = new Date(args.end);
		if (args.tags) updateEvent.tags = args.tags;
		updateEvent.updatedAt = new Date();

		const updEvent = await EventItem.findByIdAndUpdate(args._id, updateEvent, {
			new: true
		});
		return { success: true, updEvent };
	} catch (err) {
		console.log(err);
		return {
			success: false,
			errors: { path: 'save', message: 'Something went wrong' }
		};
	}
};

module.exports = { buildEvent, updateEvent };
