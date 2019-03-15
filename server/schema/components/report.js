const { gql } = require('apollo-server-express');
const { ValidateAddReport } = require('../../validation/report');

module.exports = {
	ReportType: gql`
		type Report {
			id: ID!
			userId: ID!
			text: String!
			eventId: String
			pollId: String
			organisationId: String
			commentId: String
			profileId: String
			createdAt: String
			updatedAt: String
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
				userId: String!
				text: String!
				eventId: String
				pollId: String
				commentId: String
				profileId: String
				organisationId: String
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
			event: (parent, args, { models: { EventItem } }) => {
				return EventItem.findOne({ _id: parent.eventId });
			},
			comment: (parent, args, { models: { CommentItem } }) => {
				return CommentItem.findOne({ _id: parent.commentId });
			},
			poll: (parent, args, { models: { Poll } }) => {
				return Poll.findOne({ _id: parent.pollId });
			},
			organisation: (parent, args, { models: { Organisation } }) => {
				return Organisation.findOne({ _id: parent.organisationId });
			},
			profile: (parent, args, { models: { Profile } }) => {
				return Profile.findOne({ _id: parent.profileId });
			},
			creator: (parent, args, { models: { User } }) => {
				return User.findOne({ _id: parent.userId });
			}
		},

		Mutation: {
			addReport: async (parent, args, { user, models: { Report } }) => {
				if (!user) throw new Error('Error : You are not logged in');
				const { errors, isValid } = await ValidateAddReport(args);
				if (!isValid) return { success: false, errors };
				try {
					let report = await new Report({
						userId: args.userId,
						text: args.text,
						eventId: args.eventId,
						commentId: args.commentId,
						pollId: args.pollId,
						organisationId: args.organisationId,
						profileId: args.profileId
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
