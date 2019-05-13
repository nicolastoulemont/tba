const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createTokens } = require('./auth');

const registerUser = async (args, User) => {
	try {
		const hashedPwd = await bcrypt.hash(args.password, 12);
		let user = new User({
			email: args.email,
			password: hashedPwd,
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
			createdAt: new Date(),
			updatedAt: new Date()
		}).save();

		const token = await jwt.sign(
			{
				id: user._id,
				access: user.access
			},
			process.env.SECRET,
			{ expiresIn: '1y' }
		);
		return {
			statusCode: 201,
			ok: true,
			token
		};
	} catch (err) {
		return { statusCode: 500, ok: false, errors: [{ path: err.path, message: err.message }] };
	}
};

const loginUser = async user => {
	try {
		const token = await jwt.sign(
			{
				id: user._id,
				access: user.access
			},
			process.env.SECRET,
			{ expiresIn: '1y' }
		);
		return { statusCode: 200, ok: true, token };
	} catch (err) {
		return { statusCode: 500, ok: false, errors: [{ path: err.path, message: err.message }] };
	}
};

const newLogin = async user => {
	try {
		const { accessToken, refreshToken } = createTokens(user);
		return { statusCode: 200, ok: true, accessToken, refreshToken };
	} catch (err) {
		return { statusCode: 500, ok: false, errors: [{ path: err.path, message: err.message }] };
	}
};

const changeEmail = async (args, targetUser, User) => {
	const updateUser = {
		password: args.email,
		updatedAt: new Date()
	};
	try {
		const newUserInfo = await User.findByIdAndUpdate(targetUser._id, updateUser, {
			new: true
		});
		return { statusCode: 201, ok: true, body: newUserInfo };
	} catch (err) {
		return { statusCode: 500, ok: false, errors: [{ path: err.path, message: err.message }] };
	}
};

const changePassword = async (args, targetUser, User) => {
	const hashedPwd = await bcrypt.hash(args.newPassword, 12);
	const updateUser = {
		password: hashedPwd,
		updatedAt: new Date()
	};
	try {
		const newUserInfo = await User.findByIdAndUpdate(targetUser._id, updateUser, {
			new: true
		});
		return { statusCode: 201, ok: true, body: newUserInfo };
	} catch (err) {
		return { statusCode: 500, ok: false, errors: [{ path: err.path, message: err.message }] };
	}
};

const deleteAccount = async (
	targetUser,
	{
		User,
		Profile,
		CommentItem,
		EventItem,
		Like,
		Report,
		Registration,
		Membership,
		Organisation,
		Poll,
		UserLog
	}
) => {
	try {
		await Profile.deleteOne({ user_ID: targetUser.id });
	} catch (err) {
		return { statusCode: 500, ok: false, errors: [{ path: err.path, message: err.message }] };
	}
	try {
		await CommentItem.deleteMany({ user_ID: targetUser.id });
	} catch (err) {
		return { statusCode: 500, ok: false, errors: [{ path: err.path, message: err.message }] };
	}
	try {
		await EventItem.deleteMany({ user_ID: targetUser.id });
	} catch (err) {
		return { statusCode: 500, ok: false, errors: [{ path: err.path, message: err.message }] };
	}
	try {
		await Like.deleteMany({ user_ID: targetUser.id });
	} catch (err) {
		return { statusCode: 500, ok: false, errors: [{ path: err.path, message: err.message }] };
	}
	try {
		await Report.deleteMany({ user_ID: targetUser.id });
	} catch (err) {
		return { statusCode: 500, ok: false, errors: [{ path: err.path, message: err.message }] };
	}
	try {
		await Registration.deleteMany({ user_ID: targetUser.id });
	} catch (err) {
		return { statusCode: 500, ok: false, errors: [{ path: err.path, message: err.message }] };
	}
	try {
		await Membership.deleteMany({ user_ID: targetUser.id });
	} catch (err) {
		return { statusCode: 500, ok: false, errors: [{ path: err.path, message: err.message }] };
	}
	try {
		await Organisation.deleteMany({ user_ID: targetUser.id });
	} catch (err) {
		return { statusCode: 500, ok: false, errors: [{ path: err.path, message: err.message }] };
	}
	try {
		await Poll.deleteMany({ user_ID: targetUser.id });
	} catch (err) {
		return { statusCode: 500, ok: false, errors: [{ path: err.path, message: err.message }] };
	}
	try {
		await UserLog.deleteOne({ user_ID: targetUser.id });
	} catch (err) {
		return { statusCode: 500, ok: false, errors: [{ path: err.path, message: err.message }] };
	}
	try {
		await User.findByIdAndDelete(targetUser.id);
	} catch (err) {
		return { statusCode: 500, ok: false, errors: [{ path: err.path, message: err.message }] };
	}

	return {
		statusCode: 200,
		ok: true
	};
};

module.exports = {
	registerUser,
	registerAndLogin,
	loginUser,
	newLogin,
	changeEmail,
	changePassword,
	deleteAccount
};
