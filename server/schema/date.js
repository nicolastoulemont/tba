const { gql } = require('apollo-server');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const dayjs = require('dayjs');

module.exports = {
	DateType: gql`
		scalar Date
	`,
	DateRes: {
		Date: new GraphQLScalarType({
			name: 'Date',
			description: 'Date scalar type',
			parseValue(value) {
				return dayjs(value); // value from the client
			},
			serialize(value) {
				return dayjs(value).format('YYYY-MM-DDTHH:mm:ss');
				// value sent to the client
			},
			parseLiteral(ast) {
				if (ast.kind === Kind.STRING) {
					return dayjs(ast.value); // ast value is always in string format
				}
				return null;
			}
		})
	}
};
