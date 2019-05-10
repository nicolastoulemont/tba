const batchUserProfiles = async (ids, { Profile }) => {
	const profiles = await Profile.find({
		user_ID: { $in: ids }
	});

	const groupProfiles = profiles.reduce((r, a) => {
		r[a.user_ID] = r[a.user_ID] || [];
		r[a.user_ID].push(a);
		return r;
	}, {});

	return ids.map(k => groupProfiles[k] || []);
};

const batchUserEvents = async (ids, { EventItem }) => {
	const events = await EventItem.find({
		user_ID: { $in: ids }
	});

	const groupEvents = events.reduce((r, a) => {
		r[a.user_ID] = r[a.user_ID] || [];
		r[a.user_ID].push(a);
		return r;
	}, {});

	return ids.map(k => groupEvents[k] || []);
};

const batchUserComments = async (ids, { CommentItem }) => {
	const comments = await CommentItem.find({
		user_ID: { $in: ids }
	});

	const groupComments = comments.reduce((r, a) => {
		r[a.user_ID] = r[a.user_ID] || [];
		r[a.user_ID].push(a);
		return r;
	}, {});

	return ids.map(k => groupComments[k] || []);
};

const batchUserLikes = async (ids, { Like }) => {
	const likes = await Like.find({
		user_ID: { $in: ids }
	});

	const groupLikes = likes.reduce((r, a) => {
		r[a.user_ID] = r[a.user_ID] || [];
		r[a.user_ID].push(a);
		return r;
	}, {});

	return ids.map(k => groupLikes[k] || []);
};

const batchUserReports = async (ids, { Report }) => {
	const reports = await Report.find({
		user_ID: { $in: ids }
	});

	const groupReports = reports.reduce((r, a) => {
		r[a.user_ID] = r[a.user_ID] || [];
		r[a.user_ID].push(a);
		return r;
	}, {});

	return ids.map(k => groupReports[k] || []);
};

module.exports = {
	batchUserProfiles,
	batchUserEvents,
	batchUserComments,
	batchUserLikes,
	batchUserReports
};
