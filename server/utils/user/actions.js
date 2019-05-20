const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createTokens, sendVerificationEmail, sendEventPublicVerificationEmail } = require('./auth');

const registerUser = async (args, User) => {
	try {
		const hashedPwd = await bcrypt.hash(args.password, 12);
		const user = await new User({
			email: args.email,
			password: hashedPwd,
			createdAt: new Date(),
			updatedAt: new Date()
		}).save();

		sendVerificationEmail(user);

		return { statusCode: 201, ok: true, body: user };
	} catch (err) {
		return { statusCode: 500, ok: false, errors: [{ path: err.path, message: err.message }] };
	}
};

const verifyEmail = async (args, User) => {
	try {
		const user = await User.findByIdAndUpdate(
			args._id,
			{ verified: true },
			{
				new: true
			}
		);

		const { accessToken, refreshToken } = createTokens(user);

		return { statusCode: 200, ok: true, accessToken, refreshToken };
	} catch (err) {
		return { statusCode: 500, ok: false, errors: [{ path: err.path, message: err.message }] };
	}
};

const sendVerifyEmail = async args => {
	try {
		const user = {
			id: args._id,
			email: args.email
		};
		sendVerificationEmail(user);

		return { statusCode: 201, ok: true };
	} catch (err) {
		return { statusCode: 500, ok: false, errors: [{ path: err.path, message: err.message }] };
	}
};

const publicEventRegistration = async (args, { User, Profile, Registration }) => {
	let user;
	try {
		// Register User
		const hashedPwd = await bcrypt.hash(args.password, 12);
		user = await new User({
			email: args.email,
			password: hashedPwd,
			createdAt: new Date(),
			updatedAt: new Date()
		}).save();
	} catch (err) {
		return { statusCode: 500, ok: false, errors: [{ path: err.path, message: err.message }] };
	}
	try {
		// Create User profile
		await new Profile({
			user_ID: user.id,
			name: args.name,
			position: args.position,
			organisation: args.organisation,
			createdAt: new Date(),
			updatedAt: new Date(),
			tags: []
		}).save();
	} catch (err) {
		return { statusCode: 500, ok: false, errors: [{ path: err.path, message: err.message }] };
	}
	try {
		// Create Event registration
		await new Registration({
			user_ID: user.id,
			event_ID: args.event_ID,
			eventName: args.eventName,
			eventCity: args.eventCity,
			eventAddress: args.eventAddress,
			eventStart: new Date(args.eventStart),
			eventEnd: new Date(args.eventEnd),
			createdAt: new Date(),
			updatedAt: new Date()
		}).save();
	} catch (err) {
		return { statusCode: 500, ok: false, errors: [{ path: err.path, message: err.message }] };
	}
	try {
		// Send verifical email?
		const event = {
			id: args.event_ID,
			name: args.eventName
		};
		sendEventPublicVerificationEmail(user, event);
	} catch (err) {
		return { statusCode: 500, ok: false, errors: [{ path: err.path, message: err.message }] };
	}

	const { accessToken, refreshToken } = createTokens(user);
	return { statusCode: 200, ok: true, accessToken, refreshToken };
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

const userLogin = async user => {
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
	verifyEmail,
	sendVerifyEmail,
	publicEventRegistration,
	registerAndLogin,
	userLogin,
	changeEmail,
	changePassword,
	deleteAccount
};
