const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema/schema');
const models = require('./models');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { mongoURI, SECRET, port } = require('./config/keys');

const app = express();

// DB CONNECTION
mongoose
	.connect(mongoURI, { useNewUrlParser: true })
	.then(() => console.log('DB connected'))
	.catch(err => console.log(err));
mongoose.set('useCreateIndex', true);

// GRAPHQL integration
const server = new ApolloServer({
	schema,
	context: ({ req }) => {
		const token = req.headers.authorization;
		try {
			const user = jwt.verify(token, SECRET);
			return { user, SECRET, models };
		} catch (err) {
			return {err, models};
		}
	},
	playground: true
});

server.applyMiddleware({ app });

app.listen(port, () =>
	console.log(
		`Server running on http://localhost:${port} - Playground available on http://localhost:${port}/graphql?`
	)
);
