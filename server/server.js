require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const schema = require('./schema/schema');
const models = require('./models');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Loaders = require('./utils/DataLoaders');

const DB_URI = `${process.env.DB_NAME}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${
	process.env.DB_HOST
}:${process.env.DB_DEPLOYMENT}`;

mongoose
	.connect(DB_URI, { useNewUrlParser: true, useFindAndModify: false })
	.then(() => console.log('DB connected'))
	.catch(err => console.log(err));
mongoose.set('useCreateIndex', true);

const AuthUser = req => {
	const accessToken = req.headers.accesstoken || '';
	const refreshToken = req.headers.refreshtoken || '';

	if (!accessToken && !refreshToken) return;

	if (accessToken) {
		try {
			const user = jwt.verify(accessToken, process.env.SECRET);
			return user;
		} catch {}
	}

	if (!refreshToken) return;

	let data;
	try {
		data = jwt.verify(refreshToken, process.env.SECRET2);
		return {
			needTokens: true,
			...data
		};
	} catch {
		return;
	}
};

const server = new ApolloServer({
	schema,
	context: ({ req }) => ({
		user: AuthUser(req),
		models,
		SECRET: process.env.SECRET,
		Loaders
	}),
	formatError: error => ({
		path: error.path,
		message: error.message,
		code: error.extensions.code
	}),
	playground: true
});

server.listen({ port: process.env.PORT }, () =>
	console.log(`Server running on http://localhost:${process.env.PORT}/graphql?`)
);
