const batchEventComments = async (ids, { CommentItem }) => {
	const comments = await CommentItem.find({
		event_ID: { $in: ids }
	});

	const groupComments = comments.reduce((r, a) => {
		r[a.event_ID] = r[a.event_ID] || [];
		r[a.event_ID].push(a);
		return r;
	}, {});

	return ids.map(k => groupComments[k] || []);
};

const batchEventLikes = async (ids, { Like }) => {
	const likes = await Like.find({
		event_ID: { $in: ids }
	});

	const groupLikes = likes.reduce((r, a) => {
		r[a.event_ID] = r[a.event_ID] || [];
		r[a.event_ID].push(a);
		return r;
	}, {});

	return ids.map(k => groupLikes[k] || []);
};

const batchEventReports = async (ids, { Report }) => {
	const reports = await Report.find({
		event_ID: { $in: ids }
	});

	const groupReports = reports.reduce((r, a) => {
		r[a.event_ID] = r[a.event_ID] || [];
		r[a.event_ID].push(a);
		return r;
	}, {});

	return ids.map(k => groupReports[k] || []);
};

const batchEventRegistrations = async (ids, { Registration }) => {
	const registrations = await Registration.find({
		event_ID: { $in: ids }
	});

	const groupRegistrations = registrations.reduce((r, a) => {
		r[a.event_ID] = r[a.event_ID] || [];
		r[a.event_ID].push(a);
		return r;
	}, {});

	return ids.map(k => groupRegistrations[k] || []);
};

module.exports = {
	batchEventComments,
	batchEventLikes,
	batchEventReports,
	batchEventRegistrations
};
