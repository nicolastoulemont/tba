const batchPostsReports = async (ids, { Report }) => {
	const reports = await Report.find({
		post_ID: { $in: ids }
	});

	const groupReports = reports.reduce((r, a) => {
		r[a.post_ID] = r[a.post_ID] || [];
		r[a.post_ID].push(a);
		return r;
	}, {});

	return ids.map(k => groupReports[k] || []);
};

module.exports = { batchPostsReports };
