require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema/schema');
const models = require('./models');
const Loaders = require('./utils/DataLoaders');
const connectDB = require('./config/db');
const { AuthUser } = require('./utils/user/auth');

const app = express();

connectDB();

const server = new ApolloServer({
	schema,
	context: ({ req }) => ({
		user: AuthUser(req),
		models,
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

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/graphql?`));
