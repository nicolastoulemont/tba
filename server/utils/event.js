const buildEvent = async (args, EventItem) => {
	try {
		let event = await new EventItem({
			user_ID: args.user_ID,
			name: args.name,
			abstract: args.abstract,
			description: args.description,
			isPublic: args.isPublic,
			categoryOne: args.categoryOne,
			categoryTwo: args.categoryTwo,
			categoryThree: args.categoryThree,
			location: args.location,
			start: new Date(args.start),
			end: new Date(args.end),
			createdAt: new Date(),
			updatedAt: new Date()
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
		if (args.categoryOne) updateEvent.categoryOne = args.categoryOne;
		if (args.categoryTwo) updateEvent.categoryTwo = args.categoryTwo;
		if (args.categoryThree) updateEvent.categoryThree = args.categoryThree;
		if (args.location) updateEvent.location = args.location;
		if (args.start) updateEvent.start = new Date(args.start);
		if (args.end) updateEvent.end = new Date(args.end);
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
