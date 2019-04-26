const getDatesFromString = dateString => {
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

const isEmpty = value =>
	value === undefined ||
	value === null ||
	(typeof value === 'object' && Object.keys(value).length === 0) ||
	(typeof value === 'string' && value.trim().length === 0);

module.exports = { getDatesFromString, isEmpty };
