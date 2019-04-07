const { gql } = require('apollo-server');
const { ValidateAddReport } = require('../../validation/report');

module.exports = {
	ReportType: gql`
		type Report {
			id: ID!
			user_ID: ID!
			event_ID: String
			poll_ID: String
			comment_ID: String
			organisation_ID: String
			profile_ID: String
			text: String!
			createdAt: Date
			updatedAt: Date
			event: EventItem
			comment: CommentItem
			poll: Poll
			organisation: Organisation
			profile: Profile
			creator: User
		}

		type ReportResp {
			success: Boolean!
			report: Report
			errors: [Error]
		}

		extend type Query {
			report(id: ID!): Report
			reports: [Report!]!
		}

		extend type Mutation {
			addReport(
				user_ID: String!
				event_ID: String
				poll_ID: String
				comment_ID: String
				organisation_ID: String
				profile_ID: String
				text: String!
			): ReportResp!
			deleteReport(_id: ID!): Report
		}
	`,
	// Resolvers
	ReportRes: {
		Query: {
			report: async (parent, args, { user, models: { Report } }) => {
				if (!user) throw new Error('Error : You are not logged in');
				try {
					return await Report.findById(args.id);
				} catch (err) {
					throw new Error('Bad request');
				}
			},
			reports: async (parent, args, { user, models: { Report } }) => {
				if (!user) throw new Error('Error : You are not logged in');
				try {
					return await Report.find({});
				} catch (err) {
					throw new Error('Bad request');
				}
			}
		},

		Report: {
			creator: async (parent, args, { models: { User } }) =>
				await User.findOne({ _id: parent.user_ID }),
			event: async (parent, args, { models: { EventItem } }) =>
				await EventItem.findOne({ _id: parent.event_ID }),
			poll: async (parent, args, { models: { Poll } }) =>
				await Poll.findOne({ _id: parent.poll_ID }),
			comment: async (parent, args, { models: { CommentItem } }) =>
				await CommentItem.findOne({ _id: parent.comment_ID }),
			organisation: async (parent, args, { models: { Organisation } }) =>
				await Organisation.findOne({ _id: parent.organisation_ID }),
			profile: async (parent, args, { models: { Profile } }) =>
				await Profile.findOne({ _id: parent.profile_ID })
		},

		Mutation: {
			addReport: async (parent, args, { user, models: { Report } }) => {
				if (!user) throw new Error('Error : You are not logged in');
				const { errors, isValid } = await ValidateAddReport(args);
				if (!isValid) return { success: false, errors };
				try {
					let report = await new Report({
						user_ID: args.user_ID,
						event_ID: args.event_ID,
						poll_ID: args.poll_ID,
						comment_ID: args.comment_ID,
						organisation_ID: args.organisation_ID,
						profile_ID: args.profile_ID,
						text: args.text
					}).save();
					return { success: true, report };
				} catch (err) {
					console.log(err);
					return { success: false, error };
				}
			},
			deleteReport: async (parent, args, { user, models: { Report } }) => {
				if (!user) throw new Error('Error : You are not logged in');
				try {
					return await Report.findByIdAndDelete(args._id);
				} catch (err) {
					console.log(err);
				}
			}
		}
	}
};
