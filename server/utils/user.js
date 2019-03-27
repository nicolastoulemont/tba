const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/keys');
const { isAuthorized } = require('../validation/isAuthorized');

const registerUser = async (args, User) => {
	try {
		const hashedPwd = await bcrypt.hash(args.password, 12);
		let user = new User({
			email: args.email,
			password: hashedPwd,
			access: 'citizen',
			createdAt: new Date(),
			updatedAt: new Date()
		}).save();
		return { success: true, user };
	} catch (err) {
		console.log(err);
		return { success: false, error };
	}
};

const registerAndLogin = async (args, User) => {
	try {
		const hashedPwd = await bcrypt.hash(args.password, 12);
		const user = await new User({
			email: args.email,
			password: hashedPwd,
			access: 'citizen',
			createdAt: new Date(),
			updatedAt: new Date()
		}).save();
		const token = await jwt.sign(
			{
				user: {
					id: user._id
				}
			},
			SECRET,
			{ expiresIn: '1y' }
		);
		return {
			success: true,
			user,
			token
		};
	} catch (err) {
		console.log(err);
		return { success: false, errors: [err] };
	}
};

const loginUser = async user => {
	try {
		const token = await jwt.sign(
			{
				user: {
					id: user._id
				}
			},
			SECRET,
			{ expiresIn: '1y' }
		);
		return { success: true, token };
	} catch (err) {
		console.log(err);
		return { success: false, error: err };
	}
};

const updateUserInfo = async (args, user, User) => {
	try {
		if (!(await isAuthorized(args, user, User))) return new Error('You cannot perform this action');
		let updateUser = {};
		if (args.email) updateUser.email = args.email;
		if (args.access) updateUser.access = args.access;
		updateUser.updatedAt = new Date();
		return await User.findByIdAndUpdate(args._id, updateUser, {
			new: true
		});
	} catch (err) {
		console.log(err);
		return new Error('An error has occured');
	}
};

module.exports = { registerUser, registerAndLogin, loginUser, updateUserInfo };
