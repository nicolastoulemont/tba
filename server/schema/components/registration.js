const { gql } = require('apollo-server');
const { ValidateAddRegistration } = require('../../utils/registration/validation');
const { buildRegistration, deleteRegistration } = require('../../utils/registration/actions');

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

		type RegistrationResp {
			success: Boolean!
			registration: Registration
			errors: [Error]
		}

		extend type Query {
			registration(id: ID!): Registration
			registrations: [Registration!]!
			userFutureRegistrations(user_ID: ID!, date: String): [Registration!]!
			userPastRegistrations(user_ID: ID!, date: String): [Registration!]!
			eventRegistrations(event_ID: ID!): [Registration!]!
		}

		extend type Mutation {
			addRegistration(
				user_ID: String!
				event_ID: String!
				eventName: String!
				eventCity: String
				eventAddress: String
				eventStart: String!
				eventEnd: String!
			): RegistrationResp!
			deleteRegistration(_id: ID!): Registration
		}
	`,
	// Resolvers
	RegistrationRes: {
		Query: {
			registration: async (parent, args, { user, models: { Registration } }) => {
				if (!user) throw new Error('Error : You are not logged in');
				try {
					return await Registration.findById(args.id);
				} catch (err) {
					throw new Error('Bad request');
				}
			},
			registrations: async (parent, args, { user, models: { Registration } }) => {
				if (!user) throw new Error('Error : You are not logged in');
				try {
					return await Registration.find({});
				} catch (err) {
					throw new Error('Bad request');
				}
			},
			userFutureRegistrations: async (parent, args, { user, models: { Registration } }) => {
				if (!user) throw new Error('Error : You are not logged in');
				const date = new Date(args.date);
				try {
					return await Registration.find({ user_ID: args.user_ID, eventStart: { $gte: date } });
				} catch (err) {
					throw new Error('Bad request');
				}
			},
			userPastRegistrations: async (parent, args, { user, models: { Registration } }) => {
				if (!user) throw new Error('Error : You are not logged in');
				const date = new Date(args.date);
				try {
					return await Registration.find({
						user_ID: args.user_ID,
						eventStart: { $lte: date }
					}).sort({ eventStart: 'descending' });
				} catch (err) {
					throw new Error('Bad request');
				}
			},
			eventRegistrations: async (parent, args, { user, models: { Registration } }) => {
				if (!user) throw new Error('Error : You are not logged in');
				try {
					return await Registration.find({ event_ID: args.event_ID });
				} catch (err) {
					throw new Error('Bad request');
				}
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
				if (!user) throw new Error('Error : You are not logged in');
				const { errors, isValid } = await ValidateAddRegistration(args);
				if (!isValid) return { success: false, errors };
				return await buildRegistration(args, Registration);
			},
			deleteRegistration: async (parent, args, { user, models: { Registration } }) => {
				if (!user) throw new Error('Error : You are not logged in');
				return await deleteRegistration(args, Registration);
			}
		}
	}
};
