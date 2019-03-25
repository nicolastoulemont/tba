const { gql } = require('apollo-server-express');
const { ValidateAddRegistration } = require('../../validation/registration');

module.exports = {
	RegistrationType: gql`
		type Registration {
			id: ID!
			user_ID: ID!
			event_ID: String
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
		}

		extend type Mutation {
			addRegistration(user_ID: String!, event_ID: String!): RegistrationResp!
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
			}
		},
		Registration: {
			creator: (parent, args, { models: { User } }) => {
				return User.findOne({ _id: parent.user_ID });
			},
			event: (parent, args, { models: { EventItem } }) => {
				return EventItem.findOne({ _id: parent.event_ID });
			}
		},
		Mutation: {
			addRegistration: async (parent, args, { user, models: { Registration } }) => {
				if (!user) throw new Error('Error : You are not logged in');
				const { errors, isValid } = await ValidateAddRegistration(args);
				if (!isValid) return { success: false, errors };
				try {
					let newRegistration = await new Registration({
						user_ID: args.user_ID,
						event_ID: args.event_ID
					}).save();
					return { success: true, newRegistration };
				} catch (err) {
					console.log(err);
					return { success: false, error };
				}
			},
			deleteRegistration: async (parent, args, { user, models: { Registration } }) => {
				if (!user) throw new Error('Error : You are not logged in');
				try {
					return await Registration.findByIdAndDelete(args._id);
				} catch (err) {
					console.log(err);
				}
			}
		}
	}
};
