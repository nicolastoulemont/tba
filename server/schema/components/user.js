const bcrypt = require('bcrypt');
const { gql } = require('apollo-server-express');
const { registerUser, registerAndLogin, loginUser, updateUserInfo } = require('../../utils/user');
// Validation
const { validateRegInput, validateUpdateInput } = require('../../validation/user');

module.exports = {
	UserType: gql`
		type User {
			id: ID!
			email: String!
			access: String!
			createdAt: Date
			updatedAt: Date
			profile: Profile
			organisation: Organisation
			events: [EventItem]
			registrations: [Registration]
			memberships: [Membership]
			comments: [CommentItem]
			polls: [Poll]
			likes: [Like]
			reports: [Report]
			userLog: UserLog
		}

		type RegisterResp {
			success: Boolean!
			user: User
			errors: [Error]
		}

		type LoginResp {
			success: Boolean!
			token: String
			user: User
			error: String
		}

		type RegisterAndLoginResponse {
			success: Boolean!
			user: User
			token: String
			errors: [Error]
		}

		extend type Query {
			user(id: ID!): User
			currentUser: User
			users: [User!]!
		}

		extend type Mutation {
			register(email: String!, password: String!): RegisterResp!
			registerAndLogin(email: String!, password: String!): RegisterAndLoginResponse!
			login(email: String!, password: String!): LoginResp!
			updateUser(_id: ID!, email: String): User
			deleteUser(_id: ID!): User
		}
	`,
	// Resolvers
	UserRes: {
		Query: {
			user: async (parent, args, { user, models: { User } }) => {
				if (!user) throw new Error('Error : You are not logged in');
				try {
					return await User.findById(args.id);
				} catch (err) {
					throw new Error('Bad request');
				}
			},
			currentUser: async (parent, args, { user, models: { User } }) => {
				if (!user) throw new Error('Error : You are not logged in');
				try {
					return await User.findOne({ _id: user.user.id });
				} catch (err) {
					throw new Error('Bad request');
				}
			},
			users: async (parent, args, { user, models: { User } }) => {
				if (!user) throw new Error('Error : You are not logged in');
				try {
					return await User.find({});
				} catch (err) {
					throw new Error('Bad request');
				}
			}
		},

		User: {
			profile: async (parent, args, { models: { Profile } }) =>
				await Profile.findOne({ user_ID: parent.id }),
			organisation: async (parent, args, { models: { Organisation } }) =>
				await Organisation.findOne({ user_ID: parent.id }),
			events: async (parent, args, { models: { EventItem } }) =>
				await EventItem.find({ user_ID: parent.id }),
			registrations: async (parent, args, { models: { Registration } }) =>
				await Registration.find({ user_ID: parent.id }),
			memberships: async (parent, args, { models: { Membership } }) =>
				await Membership.find({ user_ID: parent.id }),
			comments: async (parent, args, { models: { CommentItem } }) =>
				await CommentItem.find({ user_ID: parent.id }),
			polls: async (parent, args, { models: { Poll } }) => await Poll.find({ user_ID: parent.id }),
			likes: async (parent, args, { models: { Like } }) => await Like.find({ user_ID: parent.id }),
			reports: async (parent, args, { models: { Report } }) =>
				await Report.find({ user_ID: parent.id }),
			userLog: async (parent, args, { models: { UserLog } }) =>
				await UserLog.findOne({ user_ID: parent.id })
		},

		Mutation: {
			register: async (parent, args, { models: { User } }) => {
				const { errors, isValid } = await validateRegInput(args);
				if (!isValid) return { success: false, errors };
				return await registerUser(args, User);
			},
			registerAndLogin: async (parent, args, { models: { User } }) => {
				const { errors, isValid } = await validateRegInput(args);
				if (!isValid) return { success: false, errors };
				return await registerAndLogin(args, User);
			},
			login: async (parent, args, { models: { User } }) => {
				const user = await User.findOne({ email: args.email });
				if (!user) return { success: false, error: 'Invalid Email' };
				const valid = await bcrypt.compare(args.password, user.password);
				if (!valid) return { success: false, error: 'Invalid Password' };
				return await loginUser(user);
			},
			updateUser: async (parent, args, { user, models: { User } }) => {
				if (!user)
					return {
						success: false,
						error: 'You are not logged in'
					};
				const { errors, isValid } = await validateUpdateInput(args);
				if (!isValid) return { success: false, errors };
				return await updateUserInfo(args, user, User);
			},
			deleteUser: async (parent, args, { user, models: { User } }) => {
				if (!user)
					return {
						success: false,
						error: 'You are not logged in'
					};
				try {
					return await User.findByIdAndDelete(args._id);
				} catch (err) {
					console.log(err);
				}
			}
		}
	}
};
