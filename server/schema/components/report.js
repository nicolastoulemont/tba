const { gql, AuthenticationError } = require('apollo-server');
const { ValidateAddReport } = require('../../utils/report/validation');
const { buildReport, deleteReport } = require('../../utils/report/actions');
const {
	findReport,
	findReports,
	findEventReports,
	findCommentReports,
	findPollReports,
	findProfileReports
} = require('../../utils/report/queries');

module.exports = {
	ReportType: gql`
		type Report {
			id: ID!
			user_ID: ID!
			event_ID: String
			poll_ID: String
			comment_ID: String
			profile_ID: String
			post_ID: String
			text: String!
			createdAt: Date
			updatedAt: Date
			event: EventItem
			post: PostItem
			comment: CommentItem
			poll: Poll
			profile: Profile
			creator: User
		}

		type ReportsResponse implements Response {
			statusCode: Int!
			ok: Boolean!
			errors: [Error]
			body: [Report]
		}

		type ReportResponse implements Response {
			statusCode: Int!
			ok: Boolean!
			errors: [Error]
			body: Report
		}

		extend type Query {
			report(id: ID!): ReportResponse!
			reports: ReportsResponse!
			findEventReports(event_ID: ID!): ReportsResponse!
			findCommentReports(comment_ID: ID!): ReportsResponse!
			findPollReports(poll_ID: ID!): ReportsResponse!
			findProfileReports(profile_ID: ID!): ReportsResponse!
		}

		extend type Mutation {
			addReport(
				user_ID: String!
				event_ID: String
				poll_ID: String
				comment_ID: String
				profile_ID: String
				text: String!
			): ReportResponse!
			deleteReport(_id: ID!): ReportResponse!
		}
	`,
	// Resolvers
	ReportRes: {
		Query: {
			report: async (parent, args, { user, models: { Report } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await findReport(args, Report);
			},
			reports: async (parent, args, { user, models: { Report } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await findReports(args, Report);
			},
			findEventReports: async (parent, args, { user, models: { Report } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await findEventReports(args, Report);
			},
			findCommentReports: async (parent, args, { user, models: { Report } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await findCommentReports(args, Report);
			},
			findPollReports: async (parent, args, { user, models: { Report } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await findPollReports(args, Report);
			},
			findProfileReports: async (parent, args, { user, models: { Report } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await findProfileReports(args, Report);
			}
		},

		Report: {
			creator: async (parent, args, { models: { User } }) =>
				await User.findOne({ _id: parent.user_ID }),
			event: async (parent, args, { models: { EventItem } }) =>
				await EventItem.findOne({ _id: parent.event_ID }),
			post: async (parent, args, { models: { Post } }) =>
				await Post.findOne({ _id: parent.post_ID }),
			poll: async (parent, args, { models: { Poll } }) =>
				await Poll.findOne({ _id: parent.poll_ID }),
			comment: async (parent, args, { models: { CommentItem } }) =>
				await CommentItem.findOne({ _id: parent.comment_ID }),
			profile: async (parent, args, { models: { Profile } }) =>
				await Profile.findOne({ _id: parent.profile_ID })
		},

		Mutation: {
			addReport: async (parent, args, { user, models: { Report } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				const { errors, isValid } = await ValidateAddReport(args);
				if (!isValid) return { success: false, errors };
				return await buildReport(args, Report);
			},
			deleteReport: async (parent, args, { user, models: { Report } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await deleteReport(args, Report);
			}
		}
	}
};
