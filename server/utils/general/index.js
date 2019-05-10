const dayjs = require('dayjs');

const DateUrlValidation = day => {
	if (day.includes('+')) {
		const startDay = day.split('+')[0];
		const endDay = day.split('+')[1];
		if (day.split('+')[2]) return false;
		if (startDay.length !== 10) return false;
		if (endDay.length !== 10) return false;
		if (!dayjs(startDay).isValid()) return false;
		if (!dayjs(endDay).isValid()) return false;
		if (!dayjs(startDay).isBefore(dayjs(endDay))) return false;
		if (!dayjs(endDay).isAfter(dayjs(startDay))) return false;
		if (dayjs(startDay).isSame(dayjs(endDay))) return false;
		const oneDay = 24 * 60 * 60 * 1000;
		const firstDate = new Date(startDay);
		const secondDate = new Date(endDay);
		const diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay));
		if (diffDays > 30) return false;
		return true;
	}
	if (!day.includes('+')) {
		if (day.length !== 10) return false;
		if (!dayjs(day).isValid()) return false;
		return true;
	}
	return false;
};

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

const ValidStringRegExp = new RegExp(
	/^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ'?!:;,€.\s-]*$/
);

const validateSearchInput = data => {
	let errors = [];

	if (!data.search.match(ValidStringRegExp))
		errors.push({
			path: 'search',
			message: 'Only alphanumeric characters are accepted'
		});

	if (data.type && !data.type.match(ValidStringRegExp))
		errors.push({
			path: 'type',
			message: 'Only alphanumeric characters are accepted'
		});

	if (data.sort && !data.sort.match(ValidStringRegExp))
		errors.push({
			path: 'type',
			message: 'Only alphanumeric characters are accepted'
		});

	if (!DateUrlValidation(data.date))
		errors.push({
			path: 'Invalid Date format',
			message:
				'The date format must be YYYY-MM-DD for a single day or YYYY-MM-DD+YYYY-MM-DD for a range of dates'
		});

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

module.exports = {
	DateUrlValidation,
	getDatesFromString,
	isEmpty,
	ValidStringRegExp,
	validateSearchInput
};
