require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const schema = require('./schema/schema');
const models = require('./models');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;
const DB_URI = `${process.env.DB_NAME}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${
	process.env.DB_HOST
}:${process.env.DB_DEPLOYMENT}`;

// DB CONNECTION
mongoose
	.connect(DB_URI, { useNewUrlParser: true })
	.then(() => console.log('DB connected'))
	.catch(err => console.log(err));
mongoose.set('useCreateIndex', true);

// GRAPHQL integration
const server = new ApolloServer({
	schema,
	context: ({ req }) => {
		try {
			const token = req.headers.authorization || '';
			const user = jwt.verify(token, SECRET);
			return { user, SECRET, models };
		} catch (err) {
			return { err, models };
		}
	},
	formatError: error => {
		const err = {
			path: error.path,
			message: error.message,
			code: error.extensions.code
		};
		console.log(err);
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
