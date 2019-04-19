const buildEvent = async (args, EventItem) => {
	try {
		let event = await new EventItem({
			user_ID: args.user_ID,
			name: args.name,
			abstract: args.abstract,
			banner_URL: args.banner_URL,
			description: args.description,
			isPublic: args.isPublic,
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

const dailyEventsWithTags = async (date, dayafter, args, EventItem) => {
	try {
		return await EventItem.find({
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
	} catch (err) {
		throw new Error('Bad request');
	}
};

const dailyEventsWithOutTags = async (date, dayafter, args, EventItem) => {
	try {
		return await EventItem.find({
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
	} catch (err) {
		throw new Error('Bad request');
	}
};

const getDates = dateString => {
	if (!dateString.includes('+')) {
		const date = new Date(dateString);
		const dayafter = new Date(new Date(dateString).setDate(new Date(dateString).getDate() + 1));
		return {
			date,
			dayafter
		};
	} else if (dateString.includes('+')) {
		const date = new Date(dateString.split('+')[0]);
		const dayafter = new Date(
			new Date(dateString.split('+')[1]).setDate(new Date(dateString.split('+')[1]).getDate() + 1)
		);
		return { date, dayafter };
	}
};

module.exports = { buildEvent, updateEvent, dailyEventsWithTags, dailyEventsWithOutTags, getDates };
