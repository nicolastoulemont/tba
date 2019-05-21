require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema/schema');
const models = require('./models');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Loaders = require('./utils/DataLoaders');

const app = express();

if (process.env.NODE_ENV === 'development') {
	mongoose
		.connect(process.env.DEV_DB_URI, { useNewUrlParser: true, useFindAndModify: false })
		.then(() => console.log('Dev DB connected'))
		.catch(err => console.log(err));
	mongoose.set('useCreateIndex', true);
}

if (process.env.NODE_ENV === 'production') {
	mongoose
		.connect(process.env.PROD_DB_URI, { useNewUrlParser: true, useFindAndModify: false })
		.then(() => console.log('Prod DB connected'))
		.catch(err => console.log(err));
	mongoose.set('useCreateIndex', true);
}

const AuthUser = req => {
	const accessToken = req.headers.accesstoken || '';
	const refreshToken = req.headers.refreshtoken || '';

	if (!accessToken && !refreshToken) return;

	if (accessToken) {
		try {
			const user = jwt.verify(accessToken, process.env.SECRET);
			return user;
		} catch {
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
		}
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

server.applyMiddleware({ app });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
	console.log(`Server running on http://localhost:${process.env.PORT}/graphql?`)
);
