import dayjs from 'dayjs';

export const DateUrlValidation = day => {
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
