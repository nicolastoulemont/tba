const { gql, AuthenticationError } = require('apollo-server');
const {
	registerUser,
	registerAndLogin,
	changeEmail,
	loginUser,
	updateUserInfo
} = require('../../utils/user/actions');
// Validation
const {
	validateRegInput,
	validateLoginInput,
	validateChangeEmailInput,
	validateUpdateInput
} = require('../../utils/user/validation');

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

		type UserResponse implements Response {
			statusCode: Int!
			ok: Boolean!
			errors: [Error]
			token: String
			body: User
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
			errors: [Error]
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
			registerAndLogin(email: String!, password: String!): UserResponse!
			login(email: String!, password: String!): UserResponse!
			changeEmail(user_ID: ID!, email: String!, password: String!): UserResponse!
			updateUser(_id: ID!, email: String): User
			deleteUser(_id: ID!): User
		}
	`,
	// Resolvers
	UserRes: {
		Query: {
			user: async (parent, args, { user, models: { User } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				try {
					return await User.findById(args.id);
				} catch (err) {
					throw new Error('Bad request');
				}
			},
			currentUser: async (parent, args, { user, models: { User } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				try {
					return await User.findOne({ _id: user.user.id });
				} catch (err) {
					throw new Error('Bad request');
				}
			},
			users: async (parent, args, { user, models: { User } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
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
			registerAndLogin: async (parent, args, { models: { User } }) => {
				const { errors, isValid } = await validateRegInput(args);
				if (!isValid) return { statusCode: 400, ok: false, errors };
				return await registerAndLogin(args, User);
			},
			login: async (parent, args, { models: { User } }) => {
				const { errors, isValid, user } = await validateLoginInput(args);
				if (!isValid) return { statusCode: 400, ok: false, errors };
				return await loginUser(user);
			},
			changeEmail: async (parent, args, { user, models: { User } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				const { errors, isValid, targetUser } = await validateChangeEmailInput(args);
				if (!isValid) return { statusCode: 400, ok: false, errors };

				return await changeEmail(args, targetUser, User);
			},
			updateUser: async (parent, args, { user, models: { User } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				const { errors, isValid } = await validateUpdateInput(args);
				if (!isValid) return { success: false, errors };
				return await updateUserInfo(args, user, User);
			},
			deleteUser: async (parent, args, { user, models: { User } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				try {
					return await User.findByIdAndDelete(args._id);
				} catch (err) {
					console.log(err);
				}
			}
		}
	}
};
