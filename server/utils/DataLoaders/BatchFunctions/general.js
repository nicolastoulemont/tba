const batchUsers = async (ids, { User }) => {
	const users = await User.find({
		_id: { $in: ids }
	});
	const groupUsers = users.reduce((r, a) => {
		r[a._id] = r[a._id] || [];
		r[a._id].push(a);
		return r;
	}, {});
	return ids.map(k => groupUsers[k]);
};

module.exports = { batchUsers };
