// Password utils
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../../config/keys');
// Utilitary
const { gql } = require('apollo-server-express');
const gravatar = require('gravatar');
// Models
const { User } = require('../../models/');

// Validation
const validateRegInput = require('../../validation/user');

module.exports = {
	UserType: gql`
		type User {
			id: ID!
			email: String!
			avatar: String
			createdAt: String
			updatedAt: String
			events: [EventItem]
			registrations: [Registration]
			profile: Profile
			memberships: [Membership]
			comments: [CommentItem]
			polls: [Poll]
			likes: [Like]
			reports: [Report]
		}

		type RegisterResp {
			success: Boolean!
			user: User
			errors: [Error]
		}

		type LoginResp {
			success: Boolean!
			token: String
			error: String
		}

		extend type Query {
			user(id: ID!): User
			currentUser: User
			users: [User!]!
		}

		extend type Mutation {
			register(email: String!, password: String!): RegisterResp!
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
					const logUser = user.user;
					return await User.findOne({ _id: logUser.id });
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
			events: (parent, args, { models: { EventItem } }) => {
				return EventItem.find({ userId: parent.id });
			},
			registrations: (parent, args, { models: { Registration } }) => {
				return Registration.find({ userId: parent.id });
			},
			memberships: (parent, args, { models: { Membership } }) => {
				return Membership.find({ userId: parent.id });
			},
			profile: (parent, args, { models: { Profile } }) => {
				return Profile.findOne({ userId: parent.id });
			},
			comments: (parent, args, { models: { CommentItem } }) => {
				return CommentItem.find({ userId: parent.id });
			},
			polls: (parent, args, { models: { Poll } }) => {
				return Poll.find({ userId: parent.id });
			},
			likes: (parent, args, { models: { Like } }) => {
				return Like.find({ userId: parent.id });
			},
			reports: (parent, args, { models: { Report } }) => {
				return Report.find({ userId: parent.id });
			}
		},

		Mutation: {
			register: async (parent, args) => {
				const { errors, isValid } = await validateRegInput(args);
				if (!isValid) return { success: false, errors };
				const { password } = args;
				try {
					const avatar = gravatar.url(args.email, {
						s: '200',
						r: 'pg',
						d: 'mm'
					});

					const hashedPwd = await bcrypt.hash(password, 12);
					let user = new User({
						email: args.email,
						avatar,
						password: hashedPwd
					}).save();
					return { success: true, user };
				} catch (err) {
					console.log(err);
					return { success: false, error };
				}
			},
			login: async (parent, args) => {
				const user = await User.findOne({ email: args.email });
				if (!user) return { success: false, error: 'Invalid Email' };
				const valid = await bcrypt.compare(args.password, user.password);
				if (!valid) return { success: false, error: 'Invalid Password' };
				try {
					const token = await jwt.sign(
						{
							user: {
								id: user._id
							}
						},
						SECRET,
						{ expiresIn: '1y' }
					);
					return { success: true, token };
				} catch (err) {
					console.log(err);
					return { success: false, error };
				}
			},
			updateUser: async (parent, args, { user, models: { User } }) => {
				if (!user)
					return {
						success: false,
						error: 'You are not logged in'
					};
				try {
					let updateUser = {};
					if (args.email) updateUser.email = args.email;
					return await User.findByIdAndUpdate(args._id, updateUser, {
						new: true
					});
				} catch (err) {
					console.log(err);
				}
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
