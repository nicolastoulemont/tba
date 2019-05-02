const { gql, AuthenticationError } = require('apollo-server');

module.exports = {
	MembershipType: gql`
		type Membership {
			id: ID!
			user_ID: ID!
			organisationId: String!
			admin: Boolean
			accepted: Boolean
			pending: Boolean
			createdAt: Date
			updatedAt: Date
			organisation: Organisation
			creator: User
		}

		type MembershipResp {
			success: Boolean!
			membership: Membership
			errors: [Error]
		}

		extend type Query {
			membership(id: ID!): Membership
			memberships: [Membership!]!
		}

		extend type Mutation {
			addMembership(
				user_ID: String!
				organisationId: String!
				admin: Boolean
				accepted: Boolean
				pending: Boolean
			): MembershipResp!
			updateMembership(
				_id: ID!
				organisationId: String!
				admin: Boolean
				accepted: Boolean
				pending: Boolean
			): MembershipResp!
			deleteMembership(_id: ID!): MembershipResp!
		}
	`,
	// Resolvers
	MembershipRes: {
		Query: {
			membership: async (parent, args, { user, models: { Membership } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				try {
					return await Membership.findById(args.id);
				} catch (err) {
					throw new Error('Bad request');
				}
			},
			memberships: async (parent, args, { user, models: { Membership } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				try {
					return await Membership.find({});
				} catch (err) {
					throw new Error('Bad request');
				}
			}
		},

		Membership: {
			organisation: async (parent, args, { models: { Organisation } }) =>
				await Organisation.findOne({ _id: parent.organisationId }),
			creator: async (parent, args, { models: { User } }) =>
				await User.findOne({ _id: parent.user_ID })
		},
		Mutation: {
			addMembership: async (parent, args, { user, models: { Membership } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				// const { errors, isValid } = await ValidateAddRegistration(args);
				// if (!isValid) return { success: false, errors };
				try {
					let membership = await new Membership({
						user_ID: args.user_ID,
						organisationId: args.organisationId,
						admin: args.admin,
						accepted: args.accepted,
						pending: args.pending
					}).save();
					return { success: true, membership };
				} catch (err) {
					console.log(err);
				}
			},
			updateMembership: async (parent, args, { user, models: { Membership } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				// const { errors, isValid } = await validateUpdEventIntput(args);
				// if (!isValid) return { success: false, errors };

				let updateMembership = {};
				if (args.organisationId) updateEvent.organisationId = args.organisationId;
				if (args.admin) updateEvent.admin = args.admin;
				if (args.accepted) updateEvent.accepted = args.accepted;
				if (args.pending) updateEvent.pending = args.pending;

				try {
					return {
						success: true,
						updMembership: await Membership.findByIdAndUpdate(args._id, updateMembership, {
							new: true
						})
					};
				} catch (err) {
					console.log(err);
					return {
						success: false,
						errors: { path: 'membership', message: 'Something went wrong' }
					};
				}
			},
			deleteMembership: async (parent, args, { user, models: { Membership } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				try {
					const deleteMembership = await Membership.findByIdAndDelete(args._id);
					if (deleteMembership) return { success: true, deleteMembership };
				} catch (err) {
					console.log(err);
					return { success: false, error };
				}
			}
		}
	}
};
