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
	if (abstract.length > 280 || abstract.length < 5)
		err.push({
			path: 'abstract',
			message: 'The event abstract must between 5 and 280 characters'
		});
	if (description.length > 2000 || description.length < 5)
		err.push({
			path: 'description',
			message: 'The event description must between 5 and 2000 characters'
		});
	if (city.length > 30 || city.length < 1)
		err.push({ path: 'city', message: 'The event city must between 1 and 30 characters' });
	if (address.length > 70 || address.length < 5)
		err.push({ path: 'address', message: 'The event address must between 5 and 140 characters' });
	if (dayjs(end).isBefore(start))
		err.push({ path: 'start', message: 'The event start must precede its end' });
	if (dayjs(start).isSame(end))
		err.push({ path: 'start', message: 'The event start and end cannot be the same' });

	return err;
};

export const frontEndProfileInputValidation = (name, position, bio) => {
	let err = [];

	if (name.length > 70 || name.length === 0)
		err.push({
			path: 'name',
			message: 'Your name must be between 1 and 70 characters'
		});

	if (position.length > 70 || position.length === 0)
		err.push({
			path: 'position',
			message: 'Your position must be between 1 and 70 characters'
		});

	if (bio.length > 280)
		err.push({
			path: 'bio',
			message: 'Your bio must be between 0 and 280 characters'
		});

	return err;
};
