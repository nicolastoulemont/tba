export const findErrorInErrorsArr = (errors, target) => {
	if (errors.length === 0) return null;
	return errors.find(error => error.path === target);
};
