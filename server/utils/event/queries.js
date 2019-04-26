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

module.exports = { dailyEventsWithOutTags, dailyEventsWithTags };
