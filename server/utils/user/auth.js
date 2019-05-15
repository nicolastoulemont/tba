const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

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

const sendVerificationEmail = user => {
	const transporter = nodemailer.createTransport({
		tls: { rejectUnauthorized: false },
		service: 'Gmail',
		auth: {
			user: process.env.EMAIL_SENDER,
			pass: process.env.EMAIL_PWD
		}
	});

	const emailToken = jwt.sign({ id: user._id }, process.env.EMAIL_SECRET, { expiresIn: '1d' });

	const emailVerificationUrl = `http://localhost:3000/confirmation/${emailToken}`;

	transporter.sendMail(
		{
			to: user.email,
			subject: 'Email verification',
			html: `Please follow this link to confirm your email address : <a href=${emailVerificationUrl}>Confirm your email</a>`
		},
		err => console.log(err)
	);
};

module.exports = { createTokens, sendVerificationEmail };
