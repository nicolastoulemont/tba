const { gql } = require('apollo-server');

module.exports = {
	ErrorType: gql`
		type Error {
			path: String
			message: String
		}
	`
};
