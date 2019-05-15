const Validator = require('validator');
const bcrypt = require('bcrypt');
const { isEmpty } = require('../general');
const { User } = require('../../models');

const validateRegInput = async data => {
	let errors = [];

	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';

	if (!Validator.isEmail(data.email))
		errors.push({
			path: 'email',
			message: 'Email is invalid'
		});

	if (!Validator.isLength(data.password, { min: 5, max: 25 }))
		errors.push({
			path: 'password',
			message: 'Your password must be between 5 and 25 characters'
		});

	const usedEmail = await User.findOne({ email: data.email });
	if (usedEmail)
		errors.push({
			path: 'email',
			message: 'This email adress is already used'
		});

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

const validateLoginInput = async data => {
	let errors = [];
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';

	if (data.password.length === 0) errors.push({ path: 'password', message: 'Enter a password' });
	if (!Validator.isEmail(data.email)) errors.push({ path: 'email', message: 'Invalid Email' });

	const user = await User.findOne({ email: data.email });
	if (!user) {
		errors.push({ path: 'email', message: 'Wrong email' });
	} else if (user) {
		const validPwd = await bcrypt.compare(data.password, user.password);
		if (!validPwd) errors.push({ path: 'password', message: 'Invalid Password' });

		if (!user.verified) {
			errors.push({ path: 'verified', message: "Your email hasn't been verified" });
		}
	}

	return {
		errors,
		isValid: isEmpty(errors),
		user
	};
};

const validateChangeEmailInput = async data => {
	let errors = [];

	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';

	if (data.password.length === 0)
		errors.push({ path: 'currentpassword', message: 'Enter a password' });
	if (!Validator.isEmail(data.email)) errors.push({ path: 'email', message: 'Invalid Email' });

	const targetUser = await User.findById(data.user_ID);
	if (!targetUser) errors.push({ path: 'user', message: 'The provided ID is invalid' });
	if (targetUser) {
		if (!(await bcrypt.compare(data.password, targetUser.password))) {
			errors.push({ path: 'currentpassword', message: 'Invalid password' });
		}
	}

	return {
		errors,
		isValid: isEmpty(errors),
		targetUser
	};
};

const validateChangePasswordInput = async data => {
	let errors = [];

	data.currentPassword = !isEmpty(data.currentPassword) ? data.currentPassword : '';
	data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : '';

	if (data.currentPassword.length === 0)
		errors.push({ path: 'currentpassword', message: 'Enter your current password' });

	if (!Validator.isLength(data.newPassword, { min: 5, max: 25 }))
		errors.push({
			path: 'newpassword',
			message: 'Your new password must be between 5 and 25 characters'
		});

	const targetUser = await User.findById(data.user_ID);
	if (!targetUser) errors.push({ path: 'user', message: 'The provided ID is invalid' });
	if (targetUser) {
		if (!(await bcrypt.compare(data.currentPassword, targetUser.password))) {
			errors.push({ path: 'currentpassword', message: 'Invalid password' });
		}
	}

	return {
		errors,
		isValid: isEmpty(errors),
		targetUser
	};
};

const validateDeleteAccountInput = async data => {
	let errors = [];

	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';

	if (data.password.length === 0)
		errors.push({ path: 'currentpassword', message: 'Enter a password' });
	if (!Validator.isEmail(data.email)) errors.push({ path: 'email', message: 'Invalid Email' });

	const targetUser = await User.findById(data.user_ID);
	if (!targetUser) errors.push({ path: 'user', message: 'The provided ID is invalid' });
	if (targetUser) {
		if (!(await bcrypt.compare(data.password, targetUser.password))) {
			errors.push({ path: 'currentpassword', message: 'Invalid password' });
		}
	}

	return {
		errors,
		isValid: isEmpty(errors),
		targetUser
	};
};

module.exports = {
	validateRegInput,
	validateLoginInput,
	validateChangeEmailInput,
	validateChangePasswordInput,
	validateDeleteAccountInput
};
