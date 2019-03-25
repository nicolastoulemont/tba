const { gql } = require('apollo-server-express');

module.exports = {
	UserLogType: gql`
		type UserLog {
			id: ID!
			user_ID: ID!
			lastLogin: Date
			lastLogout: Date
			isActive: Boolean
			upgradedToPro: Date
			downgradedToStandard: Date
			lastComment: Date
			lastEvent: Date
			lastLike: Date
			lastPoll: Date
			lastRegistration: Date
			lastReport: Date
			createdAt: Date
			updatedAt: Date
			user: User
		}

		extend type Query {
			userLog(id: ID!): UserLog
			allUserLog: [UserLog!]!
		}

		extend type Mutation {
			createUserLog(
				user_ID: ID!
				lastLogin: Date
				lastLogout: Date
				isActive: Boolean
				upgradedToPro: Date
				downgradedToStandard: Date
				lastComment: Date
				lastEvent: Date
				lastLike: Date
				lastPoll: Date
				lastRegistration: Date
				lastReport: Date
			): UserLog
			updateUserLog(
				_id: ID!
				lastLogin: Date
				lastLogout: Date
				isActive: Boolean
				upgradedToPro: Date
				downgradedToStandard: Date
				lastComment: Date
				lastEvent: Date
				lastLike: Date
				lastPoll: Date
				lastRegistration: Date
				lastReport: Date
			): UserLog
			deleteUserLog(_id: ID!): UserLog
		}
	`,
	UserLogRes: {
		Query: {
			userLog: async (parent, args, { user, models: { UserLog } }) => {
				if (!user) throw new Error('Error: you are not logged in');
				try {
					return await UserLog.findById(args.id);
				} catch (err) {
					console.log(err);
				}
			},
			allUserLog: async (parent, args, { user, models: { UserLog } }) => {
				if (!user) throw new Error('Error : You are not logged in');
				try {
					return await UserLog.find({});
				} catch (err) {
					throw new Error('Bad request');
				}
			}
		},
		UserLog: {
			user: async (parent, args, { models: { User } }) => {
				return await User.findById(parent.user_ID);
			}
		},

		Mutation: {
			createUserLog: async (parent, args, { user, models: { UserLog } }) => {
				if (!user)
					return {
						success: false,
						error: 'You are not logged in'
					};
				// TODO : Add input validation function
				// create userlogs
				try {
					let userLog = new UserLog({
						user_ID: args.user_ID,
						lastLogin: args.lastLogin,
						lastLogout: args.lastLogout,
						isActive: args.isActive,
						upgradedToPro: args.upgradedToPro,
						downgradedToStandard: args.downgradedToStandard,
						lastComment: args.lastComment,
						lastEvent: args.lastEvent,
						lastLike: args.lastLike,
						lastPoll: args.lastPoll,
						lastRegistration: args.lastRegistration,
						lastReport: args.lastReport
					}).save();
					return userLog;
				} catch (err) {
					console.log(err);
				}
			},
			updateUserLog: async (parent, args, { user, models: { UserLog } }) => {
				if (!user)
					return {
						success: false,
						error: 'You are not logged in'
					};
				// TODO : Add input validation function
				// update userlogs
			},
			deleteUserLog: async (parent, args, { user, models: { UserLog } }) => {
				if (!user)
					return {
						success: false,
						error: 'You are not logged in'
					};
				// TODO : Add input validation function
				// delete userlogs
			}
		}
	}
};
