const { gql } = require('apollo-server');
const { validateOrgInput, validateUpdOrgIntput } = require('../../utils/organisation/validation');
const {
	buildOrganisation,
	updateOrganisation,
	deleteOrganisation
} = require('../../utils/organisation/actions');

module.exports = {
	OrganisationType: gql`
		type Organisation {
			id: ID!
			user_ID: ID!
			name: String!
			address: String!
			description: String!
			type: String!
			registryId: String
			createdAt: Date
			updatedAt: Date
			creator: User
			admins: [Membership]
			members: [Membership]
			applicants: [Membership]
			reports: [Report]
		}

		type OrganisationResp {
			success: Boolean!
			organisation: Organisation
			errors: [Error]
		}

		extend type Query {
			organisation(id: ID!): Organisation
			searchOrganisationsByName(search: String, limit: Int): [Organisation!]!
			organisations: [Organisation!]!
		}

		extend type Mutation {
			addOrganisation(
				user_ID: String!
				name: String!
				address: String!
				description: String!
				type: String!
				registryId: String
			): OrganisationResp!
			updateOrganisation(
				_id: ID!
				name: String!
				address: String!
				description: String!
				type: String!
				registryId: String
			): OrganisationResp!
			deleteOrganisation(_id: ID!): OrganisationResp!
		}
	`,
	// Resolvers
	OrganisationRes: {
		Query: {
			organisation: async (parent, args, { user, models: { Organisation } }) => {
				if (!user) throw new Error('Error : You are not logged in');
				try {
					return await Organisation.findById(args.id);
				} catch (err) {
					throw new Error('Bad request');
				}
			},
			searchOrganisationsByName: async (parent, args, { user, models: { Organisation } }) => {
				if (!user) throw new Error('Error : You are not logged in');
				try {
					return await Organisation.find({
						name: { $regex: new RegExp(args.search) }
					})
						.limit(args.limit)
						.sort({ name: 1 });
				} catch (err) {
					throw new Error('Bad request');
				}
			},
			organisations: async (parent, args, { user, models: { Organisation } }) => {
				if (!user) throw new Error('Error : You are not logged in');
				try {
					return await Organisation.find({});
				} catch (err) {
					throw new Error('Bad request');
				}
			}
		},
		Organisation: {
			creator: async (parent, args, { models: { User } }) =>
				await User.findOne({ _id: parent.user_ID }),

			admins: async (parent, args, { models: { Membership } }) =>
				await Membership.find({
					organisationId: parent.id,
					admin: true,
					accepted: true,
					pending: false
				}),
			members: async (parent, args, { models: { Membership } }) =>
				await Membership.find({
					organisationId: parent.id,
					admin: false,
					accepted: true,
					pending: false
				}),
			applicants: async (parent, args, { models: { Membership } }) =>
				await Membership.find({
					organisationId: parent.id,
					admin: false,
					accepted: false,
					pending: true
				}),
			reports: async (parent, args, { models: { Report } }) =>
				await Report.find({ orgId: parent.id })
		},

		Mutation: {
			addOrganisation: async (parent, args, { user, models: { Organisation } }) => {
				if (!user)
					return {
						success: false,
						error: 'You are not logged in'
					};
				const { errors, isValid } = await validateOrgInput(args);
				if (!isValid) return { success: false, errors };
				return await buildOrganisation(args, Organisation);
			},
			updateOrganisation: async (parent, args, { user, models: { Organisation } }) => {
				if (!user)
					return {
						success: false,
						error: 'You are not logged in'
					};
				const { errors, isValid } = await validateUpdOrgIntput(args);
				if (!isValid) return { success: false, errors };
				return await updateOrganisation(args, Organisation);
			},
			deleteOrganisation: async (parent, args, { user, models: { Organisation } }) => {
				if (!user)
					return {
						success: false,
						error: 'You are not logged in'
					};
				return await deleteOrganisation(args, Organisation);
			}
		}
	}
};
