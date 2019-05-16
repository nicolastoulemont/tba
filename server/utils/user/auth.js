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

	const emailToken = jwt.sign({ id: user.id }, process.env.EMAIL_SECRET, { expiresIn: '1d' });

	const emailVerificationUrl = `http://localhost:3000/confirmation/${emailToken}`;

	const emailHtml = `
	<!DOCTYPE html>
	<html>
		<head>
			<style>
				body {
					font-size: 1rem;
					font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
					padding: 10px;
				}
	
				h3 {
					font-weight: bold;
					font-size: 1.75rem;
					color: #4f96d5;
					margin: 1rem;
				}
				h4 {
					font-weight: bold;
					font-size: 1.5rem;
					color: rgb(99, 95, 95);
					margin: 1rem;
				}
				p {
					margin: 1rem;
					font-weight: bold;
					color: rgb(99, 95, 95);
				}
	
				a {
					text-decoration: none;
					font-weight: bold;
					color: #4f96d5;
				}
			</style>
		</head>
		<body>
			<h3>MyEU</h3>
			<h4>Email confirmation</h4>
			<p>
				Please follow this link to confirm your email address :
				<a href="${emailVerificationUrl}">Confirm your email</a>
			</p>
			<p>Thank you for registering to MyEU.</p>
		</body>
	</html>
	
	`;

	transporter.sendMail({
		to: user.email,
		subject: 'Email verification',
		html: emailHtml
	});
};

module.exports = { createTokens, sendVerificationEmail };
