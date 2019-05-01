const { Registration, EventItem } = require('../../models/');
const { isEmpty } = require('../general');
const dayjs = require('dayjs');

const ValidateAddRegistration = async data => {
	let errors = [];

	const validMongoID = new RegExp(/^[a-zA-Z0-9]+$/);
	if (!data.event_ID.match(validMongoID))
		errors.push({ path: 'event', message: 'Invalid event_ID' });
	if (!data.user_ID.match(validMongoID)) errors.push({ path: 'user', message: 'Invalid user_ID' });

	const targetEvent = await EventItem.findById(data.event_ID);
	if (!targetEvent)
		errors.push({ path: 'event', message: "The event you try to register doesn't exist" });

	if (
		await Registration.findOne({
			event_ID: data.event_ID,
			user_ID: data.user_ID
		})
	)
		errors.push({
			path: 'event',
			message: 'You already registered to this event'
		});

	if (data.eventName !== targetEvent.name)
		errors.push({ path: 'event', message: 'The input name is wrong' });
	if (data.eventCity !== targetEvent.city)
		errors.push({ path: 'event', message: 'The input city is wrong' });
	if (data.eventAddress !== targetEvent.address)
		errors.push({ path: 'event', message: 'The input address is wrong' });
	if (!dayjs(data.eventStart).isSame(dayjs(targetEvent.start)))
		errors.push({ path: 'event', message: 'The input start is wrong' });
	if (!dayjs(data.eventEnd).isSame(dayjs(targetEvent.end)))
		errors.push({ path: 'event', message: 'The input start is wrong' });

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

module.exports = { ValidateAddRegistration };
