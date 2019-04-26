const { gql, AuthenticationError } = require('apollo-server');
const { buildProfile, updateProfile, deleteProfile } = require('../../utils/profile/actions');

module.exports = {
	ProfileType: gql`
		type Profile {
			id: ID!
			user_ID: ID!
			organisation_ID: String
			name: String!
			position: String!
			hideSocial: Boolean
			privateProfile: Boolean
			bio: String
			twitter_URL: String
			linkedin_URL: String
			picture_URL: String
			createdAt: Date
			updatedAt: Date
			tags: [String]
			creator: User
		}

		type ProfileResp {
			success: Boolean!
			profile: Profile
			error: String
		}

		extend type Query {
			profile(id: ID!): Profile
			searchProfilesByName(search: String, limit: Int): [Profile!]!
			profiles: [Profile!]!
		}

		extend type Mutation {
			addProfile(
				user_ID: String!
				organisation_ID: String
				name: String!
				position: String!
				hideSocial: Boolean
				privateProfile: Boolean
				bio: String
				twitter_URL: String
				linkedin_URL: String
				picture_URL: String
				tags: [String]
			): ProfileResp
			updateProfile(
				_id: ID!
				organisation_ID: String
				name: String
				position: String
				hideSocial: Boolean
				privateProfile: Boolean
				bio: String
				twitter_URL: String
				linkedin_URL: String
				picture_URL: String
				tags: [String]
			): ProfileResp
			deleteProfile(_id: ID!, user_ID: String!): ProfileResp
		}
	`,
	// Resolvers
	ProfileRes: {
		Query: {
			profile: async (parent, args, { user, models: { Profile } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				try {
					return await Profile.findById(args.id);
				} catch (err) {
					throw new Error('Bad request');
				}
			},
			searchProfilesByName: async (parent, args, { user, models: { Profile } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				try {
					return await Profile.find({
						name: { $regex: new RegExp(args.search) }
					})
						.limit(args.limit)
						.sort({ name: 1 });
				} catch (err) {
					throw new Error('Bad request');
				}
			},
			profiles: async (parent, args, { user, models: { Profile } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				try {
					return await Profile.find({});
				} catch (err) {
					throw new Error('Bad request');
				}
			}
		},

		Profile: {
			creator: async (parent, args, { models: { User } }) => await User.findById(parent.user_ID)
		},

		Mutation: {
			addProfile: async (parent, args, { user, models: { Profile } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				// TODO : Add input validation function
				return buildProfile(args, Profile);
			},
			updateProfile: async (parent, args, { user, models: { User, Profile } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				// TODO : Add input validation function
				return updateProfile(args, user, User, Profile);
			},
			deleteProfile: async (parent, args, { user, models: { User, Profile } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				try {
					return await deleteProfile(args, user, User, Profile);
				} catch (err) {
					console.log(err);
					return { success: false, error };
				}
			}
		}
	}
};
