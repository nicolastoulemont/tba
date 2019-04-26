const { gql } = require('apollo-server');

module.exports = {
	ResponseType: gql`
		type Error {
			path: String
			message: String
		}

		interface Response {
			statusCode: Int!
			ok: Boolean!
			errors: [Error]
		}
	`
};
