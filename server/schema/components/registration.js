const { gql, AuthenticationError } = require('apollo-server');
const { ValidateAddRegistration } = require('../../utils/registration/validation');
const { buildRegistration, deleteRegistration } = require('../../utils/registration/actions');
const {
	findRegistration,
	findRegistrations,
	searchUserRegistrations,
	findUserFutureRegistrations,
	findUserPastRegistrations,
	findEventRegistrations
} = require('../../utils/registration/queries');
const { getDatesFromString } = require('../../utils/general');

module.exports = {
	RegistrationType: gql`
		type Registration {
			id: ID!
			user_ID: ID!
			event_ID: String
			eventName: String
			eventCity: String
			eventAddress: String
			eventStart: Date
			eventEnd: Date
			createdAt: Date
			updatedAt: Date
			event: EventItem
			creator: User
		}

		type RegistrationsResponse implements Response {
			statusCode: Int!
			ok: Boolean!
			errors: [Error]
			body: [Registration]
		}

		type RegistrationResponse implements Response {
			statusCode: Int!
			ok: Boolean!
			errors: [Error]
			body: Registration
		}

		extend type Query {
			registration(id: ID!): RegistrationResponse!
			registrations: RegistrationsResponse!
			searchUserRegistrations(
				user_ID: ID!
				date: String!
				search: String
				limit: Int!
				sort: String!
			): RegistrationsResponse!
			userFutureRegistrations(user_ID: ID!, date: String): RegistrationsResponse!
			userPastRegistrations(user_ID: ID!, date: String): RegistrationsResponse!
			eventRegistrations(event_ID: ID!): RegistrationsResponse!
		}

		extend type Mutation {
			addRegistration(
				user_ID: ID!
				event_ID: ID!
				eventName: String!
				eventCity: String
				eventAddress: String
				eventStart: String!
				eventEnd: String!
			): RegistrationResponse!
			deleteRegistration(_id: ID!): RegistrationResponse!
		}
	`,
	// Resolvers
	RegistrationRes: {
		Query: {
			registration: async (parent, args, { user, models: { Registration } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await findRegistration(args, Registration);
			},
			registrations: async (parent, args, { user, models: { Registration } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await findRegistrations(args, Registration);
			},
			searchUserRegistrations: async (parent, args, { user, models: { Registration } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				const { date, dayafter } = getDatesFromString(args.date);
				return await searchUserRegistrations(date, dayafter, args, Registration);
			},
			userFutureRegistrations: async (parent, args, { user, models: { Registration } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await findUserFutureRegistrations(args, Registration);
			},
			userPastRegistrations: async (parent, args, { user, models: { Registration } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await findUserPastRegistrations(args, Registration);
			},
			eventRegistrations: async (parent, args, { user, models: { Registration } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await findEventRegistrations(args, Registration);
			}
		},
		Registration: {
			creator: async (parent, args, { models: { User } }) =>
				await User.findOne({ _id: parent.user_ID }),
			event: async (parent, args, { models: { EventItem } }) =>
				await EventItem.findOne({ _id: parent.event_ID })
		},
		Mutation: {
			addRegistration: async (parent, args, { user, models: { Registration } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				const { errors, isValid } = await ValidateAddRegistration(args);
				if (!isValid) return { statusCode: 400, ok: false, errors };
				return await buildRegistration(args, Registration);
			},
			deleteRegistration: async (parent, args, { user, models: { Registration } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await deleteRegistration(args, Registration);
			}
		}
	}
};
