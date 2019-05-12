const { gql, AuthenticationError } = require('apollo-server');
const { buildProfile, updateProfile, deleteProfile } = require('../../utils/profile/actions');
const { validateProfileInput } = require('../../utils/profile/validation');
const {
	findProfile,
	findProfiles,
	findProfilesByNames,
	findUserProfile
} = require('../../utils/profile/queries');

module.exports = {
	ProfileType: gql`
		type Profile {
			id: ID!
			user_ID: ID!
			name: String!
			position: String!
			organisation: String
			hideSocial: Boolean
			privateProfile: Boolean
			bio: String
			twitter_URL: String
			linkedin_URL: String
			picture_URL: String
			website_URL: String
			createdAt: Date
			updatedAt: Date
			tags: [String]
			creator: User
		}

		type ProfilesResponse implements Response {
			statusCode: Int!
			ok: Boolean!
			errors: [Error]
			body: [Profile]
		}

		type ProfileResponse implements Response {
			statusCode: Int!
			ok: Boolean!
			errors: [Error]
			body: Profile
		}

		extend type Query {
			profile(id: ID!): ProfileResponse
			profiles: ProfilesResponse
			searchProfilesByName(search: String, limit: Int): ProfilesResponse
			searchUserProfile(user_ID: ID!): ProfileResponse!
		}

		extend type Mutation {
			addProfile(
				user_ID: String!
				name: String!
				position: String!
				organisation: String
				hideSocial: Boolean
				bio: String
				twitter_URL: String
				linkedin_URL: String
				website_URL: String
				picture_URL: String
				tags: [String]
			): ProfileResponse!
			updateProfile(
				_id: ID!
				user_ID: ID!
				name: String
				position: String
				organisation: String
				hideSocial: Boolean
				bio: String
				twitter_URL: String
				linkedin_URL: String
				website_URL: String
				picture_URL: String
				tags: [String]
			): ProfileResponse!
			deleteProfile(_id: ID!, user_ID: String!): ProfileResponse
		}
	`,
	// Resolvers
	ProfileRes: {
		Query: {
			profile: async (parent, args, { user, models: { Profile } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await findProfile(args, Profile);
			},
			profiles: async (parent, args, { user, models: { Profile } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await findProfiles(args, Profile);
			},
			searchProfilesByName: async (parent, args, { user, models: { Profile } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await findProfilesByNames(args, Profile);
			},
			searchUserProfile: async (parent, args, { user, models: { Profile } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await findUserProfile(args, Profile);
			}
		},

		Profile: {
			creator: async (parent, args, { models: { User } }) => await User.findById(parent.user_ID)
		},

		Mutation: {
			addProfile: async (parent, args, { user, models: { Profile } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				const { errors, isValid } = await validateProfileInput(args);
				if (!isValid) return { statusCode: 400, ok: false, errors };
				return await buildProfile(args, Profile);
			},
			updateProfile: async (parent, args, { user, models: { Profile } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				if (user.id !== args.user_ID)
					throw new AuthenticationError('Please login to get the requested response');
				const { errors, isValid } = await validateProfileInput(args);
				if (!isValid) return { statusCode: 400, ok: false, errors };
				return await updateProfile(args, Profile);
			},
			deleteProfile: async (parent, args, { user, models: { Profile } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				if (user.id !== args.user_ID)
					throw new AuthenticationError('Please login to get the requested response');
				return await deleteProfile(args, Profile);
			}
		}
	}
};
