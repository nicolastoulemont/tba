require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const schema = require('./schema/schema');
const models = require('./models');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Loaders = require('./utils/DataLoaders');

const SECRET = process.env.SECRET;
const DB_URI = `${process.env.DB_NAME}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${
	process.env.DB_HOST
}:${process.env.DB_DEPLOYMENT}`;

// DB CONNECTION
mongoose
	.connect(DB_URI, { useNewUrlParser: true, useFindAndModify: false })
	.then(() => console.log('DB connected'))
	.catch(err => console.log(err));
mongoose.set('useCreateIndex', true);
mongoose.set('debug', true);

const getUser = req => {
	try {
		const token = req.headers.authorization || '';
		const user = jwt.verify(token, SECRET);
		return user;
	} catch {}
	return;
};

// GRAPHQL integration
const server = new ApolloServer({
	schema,
	context: ({ req }) => ({
		user: getUser(req),
		models,
		SECRET,
		Loaders
	}),
	formatError: error => {
		const err = {
			path: error.path,
			message: error.message,
			code: error.extensions.code
		};
		return err;
	},
	playground: true
});

server.listen(process.env.PORT, () =>
	console.log(
		`Server running on http://localhost:${
			process.env.PORT
		} - Playground available on http://localhost:${process.env.PORT}/graphql?`
	)
);
