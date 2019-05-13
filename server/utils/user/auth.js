const jwt = require('jsonwebtoken');

const createTokens = user => {
	const accessToken = jwt.sign(
		{
			id: user._id,
			access: user.access
		},
		process.env.SECRET,
		{ expiresIn: '20min' }
	);

	const refreshToken = jwt.sign(
		{
			id: user._id,
			access: user.access
		},
		process.env.SECRET2,
		{ expiresIn: '7d' }
	);

	return { accessToken, refreshToken };
};

module.exports = { createTokens };
