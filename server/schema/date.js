const { gql } = require('apollo-server-express');
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
				return new Date(value); // value from the client
			},
			serialize(value) {
				const date = new Date(value);
				date.setHours(date.getHours() + 1);
				return date.toISOString().slice(0, 19); // value sent to the client
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
