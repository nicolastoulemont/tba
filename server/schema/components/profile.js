const { gql } = require('apollo-server-express');
const { buildProfile, updateProfile, deleteProfile } = require('../../builders/profile');

module.exports = {
	ProfileType: gql`
		type Profile {
			id: ID!
			userId: ID!
			name: String!
			organisation: String
			position: String!
			interestOne: String!
			interestTwo: String
			interestThree: String
			bio: String
			twitter: String
			linkedin: String
			createdAt: String
			updatedAt: String
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
				userId: String!
				name: String!
				organisation: String
				position: String!
				interestOne: String!
				interestTwo: String
				interestThree: String
				bio: String
				twitter: String
				linkedin: String
			): ProfileResp
			updateProfile(
				_id: ID!
				name: String
				organisation: String
				position: String
				interestOne: String!
				interestTwo: String
				interestThree: String
				bio: String
				twitter: String
				linkedin: String
			): ProfileResp
			deleteProfile(_id: ID!, userId: String!): ProfileResp
		}
	`,
	// Resolvers
	ProfileRes: {
		Query: {
			profile: async (parent, args, { user, models: { Profile } }) => {
				if (!user) throw new Error('Error : You are not logged in');
				try {
					return await Profile.findById(args.id);
				} catch (err) {
					throw new Error('Bad request');
				}
			},
			searchProfilesByName: async (parent, args, { user, models: { Profile } }) => {
				if (!user) throw new Error('Error : You are not logged in');
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
				if (!user) throw new Error('Error : You are not logged in');
				try {
					return await Profile.find({});
				} catch (err) {
					throw new Error('Bad request');
				}
			}
		},

		Profile: {
			creator: (parent, args, { models: { User } }) => {
				return User.findById(parent.userId);
			}
		},

		Mutation: {
			addProfile: async (parent, args, { user, models: { Profile } }) => {
				if (!user)
					return {
						success: false,
						error: 'You are not logged in'
					};
				// TODO : Add input validation function
				return buildProfile(args, Profile);
			},
			updateProfile: async (parent, args, { user, models: { User, Profile } }) => {
				if (!user)
					return {
						success: false,
						error: 'You are not logged in'
					};
				// TODO : Add input validation function
				return updateProfile(args, user, User, Profile);
			},
			deleteProfile: async (parent, args, { user, models: { User, Profile } }) => {
				if (!user)
					return {
						success: false,
						error: 'You are not logged in'
					};
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
