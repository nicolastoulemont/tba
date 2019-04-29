import dayjs from 'dayjs';

export const findErrorInErrorsArr = (errors, target) => {
	if (errors.length === 0) return null;
	return errors.find(error => error.path === target);
};

export const frontEndEventInputValidation = (
	name,
	abstract,
	description,
	city,
	address,
	start,
	end
) => {
	let err = [];
	if (name.length > 140 || name.length < 5)
		err.push({ path: 'name', message: 'The event name must between 5 and 140 characters' });
	if (abstract.length > 140 || abstract.length < 5)
		err.push({
			path: 'abstract',
			message: 'The event abstract must between 5 and 280 characters'
		});
	if (description.length > 140 || description.length < 5)
		err.push({
			path: 'description',
			message: 'The event description must between 5 and 2000 characters'
		});
	if (city.length > 70 || city.length < 5)
		err.push({ path: 'city', message: 'The event city must between 5 and 140 characters' });
	if (address.length > 70 || address.length < 5)
		err.push({ path: 'address', message: 'The event address must between 5 and 140 characters' });
	if (!dayjs(start).isBefore(dayjs(end)) || !dayjs(start).isSame(dayjs(end)))
		err.push({ path: 'start', message: 'The event start must precede its end' });

	return err;
};
