const batchRegistrationsEvent = async (ids, { EventItem }) => {
	const events = await EventItem.find({
		_id: { $in: ids }
	});

	const groupEvents = events.reduce((r, a) => {
		r[a._id] = r[a._id] || [];
		r[a._id].push(a);
		return r;
	}, {});

	return ids.map(k => groupEvents[k]);
};

module.exports = { batchRegistrationsEvent };
