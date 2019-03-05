const Poll = require('../../models/Poll');
const EventItem = require('../../models/Eventitem');
const CommentItem = require('../../models/Comment');
const Organisation = require('../../models/Organisation');
const Profile = require('../../models/Profile');
const Report = require('../../models/Report');
const User = require('../../models/User');
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
      report: (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        return Report.findById(args.id);
      },
      reports: (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        return Report.find({});
      }
    },

    Report: {
      event: (parent, args) => {
        return EventItem.findOne({ _id: parent.eventId });
      },
      comment: (parent, args) => {
        return CommentItem.findOne({ _id: parent.commentId });
      },
      poll: (parent, args) => {
        return Poll.findOne({ _id: parent.pollId });
      },
      organisation: (parent, args) => {
        return Organisation.findOne({ _id: parent.organisationId });
      },
      profile: (parent, args) => {
        return Profile.findOne({ _id: parent.profileId });
      },
      creator: (parent, args) => {
        return User.findOne({ _id: parent.userId });
      }
    },

    Mutation: {
      addReport: async (parent, args, { user }) => {
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
        } catch (e) {
          console.log(e);
          return { success: false, error };
        }
      },
      deleteReport: async (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        try {
          return await Report.findByIdAndDelete(args._id);
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
};
