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

	const ValidString = /^[\wáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ?!,€._-\s]+$/;
	const stringRegExp = new RegExp(ValidString);

	if (!name.match(stringRegExp))
		err.push({
			path: 'name',
			message: 'Only alphanumeric characters are accepted'
		});
	if (!abstract.match(stringRegExp))
		err.push({
			path: 'abstract',
			message: 'Only alphanumeric characters are accepted'
		});
	if (!description.match(stringRegExp))
		err.push({
			path: 'description',
			message: 'Only alphanumeric characters are accepted'
		});
	if (!city.match(stringRegExp))
		err.push({
			path: 'city',
			message: 'Only alphanumeric characters are accepted'
		});
	if (!address.match(stringRegExp))
		err.push({
			path: 'address',
			message: 'Only alphanumeric characters are accepted'
		});

	if (dayjs(end).isBefore(start))
		err.push({ path: 'start', message: 'The event start must precede its end' });
	if (dayjs(start).isSame(end))
		err.push({ path: 'start', message: 'The event start and end cannot be the same' });

	return err;
};

export const frontEndProfileInputValidation = (
	name,
	position,
	bio,
	twitter_URL,
	linkedin_URL,
	website_URL
) => {
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

	const ValidString = /^[\wáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ?!,€._-\s]+$/;
	const stringRegExp = new RegExp(ValidString);

	if (!name.match(stringRegExp))
		err.push({
			path: 'name',
			message: 'Only alphanumeric characters are accepted'
		});
	if (!position.match(stringRegExp))
		err.push({
			path: 'position',
			message: 'Only alphanumeric characters are accepted'
		});
	if (!bio.match(stringRegExp))
		err.push({
			path: 'bio',
			message: 'Only alphanumeric characters are accepted'
		});

	if (twitter_URL.length > 140)
		err.push({
			path: 'twitter_URL',
			message: 'Your Twitter URL cannot exceed 140 characters'
		});

	if (linkedin_URL.length > 140)
		err.push({
			path: 'linkedin_URL',
			message: 'Your LinkedIn URL cannot exceed 140 characters'
		});

	if (website_URL.length > 140)
		err.push({
			path: 'website_URL',
			message: 'Your Website URL cannot exceed 140 characters'
		});

	const ValidURL = /^(?:http(s)?:\/\/)?[\w.-]+(?:.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/g;
	const urlRegExp = new RegExp(ValidURL);

	if (twitter_URL !== '' && !twitter_URL.match(urlRegExp))
		err.push({ path: 'twitter_URL', message: 'Your Twitter URL must be a valid URL' });
	if (linkedin_URL !== '' && !linkedin_URL.match(urlRegExp))
		err.push({ path: 'linkedin_URL', message: 'Your LinkedIn URL must be a valid URL' });
	if (website_URL !== '' && !website_URL.match(urlRegExp))
		err.push({ path: 'website_URL', message: 'Your Website URL must be a valid URL' });

	return err;
};
