const Poll = require('../../models/Poll');
const EventItem = require('../../models/Eventitem');
const CommentItem = require('../../models/Comment');
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
      commentId: String
      createdAt: String
      updatedAt: String
      event: EventItem
      comment: CommentItem
      poll: Poll
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
        return Poll.find({ _id: parent.pollId });
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

        let newReport = new Report({
          userId: args.userId,
          text: args.text,
          eventId: args.eventId,
          commentId: args.commentId,
          pollId: args.pollId
        });
        // Save to db
        const report = await newReport.save();
        return { success: true, report };
      },
      deleteReport: async (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');

        const deleteReport = await Report.findByIdAndDelete(args._id);
        if (!deleteReport) {
          console.log('Delete attempt Failed');
        } else {
          return deleteReport;
        }
      }
    }
  }
};
