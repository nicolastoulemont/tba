const { createTokens } = require('./auth');
const jwt = require('jsonwebtoken');

const findCurrentUser = async (user, User) => {
	if (!user.needTokens) {
		try {
			const targetUser = await User.findById(user.id);
			return {
				statusCode: 200,
				ok: true,
				body: targetUser
			};
		} catch {
			return {
				statusCode: 404,
				ok: false,
				errors: [
					{
						path: 'Not Found',
						message: 'The server cannot find the requested ressource'
					}
				]
			};
		}
	}
	if (user.needTokens) {
		try {
			const targetUser = await User.findById(user.id);
			const { accessToken, refreshToken } = createTokens(targetUser);

			return {
				statusCode: 200,
				ok: true,
				accessToken,
				refreshToken,
				body: targetUser
			};
		} catch {
			return {
				statusCode: 404,
				ok: false,
				errors: [
					{
						path: 'Not Found',
						message: 'The server cannot find the requested ressource'
					}
				]
			};
		}
	}
	return;
};

module.exports = { findCurrentUser };
