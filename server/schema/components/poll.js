const Poll = require('../../models/Poll');
const EventItem = require('../../models/Eventitem');
const CommentItem = require('../../models/Comment');
const Like = require('../../models/Like');
const Report = require('../../models/Report');
const User = require('../../models/User');
const { gql } = require('apollo-server-express');

module.exports = {
  PollType: gql`
    type Poll {
      id: ID!
      userId: ID!
      eventId: String!
      text: String!
      createdAt: String
      updatedAt: String
      event: EventItem
      comments: [CommentItem]
      likes: [Like]
      reports: [Report]
      creator: User
    }

    extend type Query {
      poll(id: ID!): Poll
      polls: [Poll!]!
    }

    extend type Mutation {
      addPoll(userId: String!, eventId: String!, text: String!): Poll
      updatePoll(_id: ID!, text: String): Poll
      deletePoll(_id: ID!): Poll
    }
  `,
  // Resolvers
  PollRes: {
    Query: {
      poll: (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        try {
          return Poll.findById(args.id);
        } catch (err) {
          console.log(err);
        }
      },
      polls: (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        try {
          return Poll.find({});
        } catch (err) {
          console.log(err);
        }
      }
    },

    Poll: {
      creator: (parent, args) => {
        return User.findOne({ _id: parent.userId });
      },
      event: (parent, args) => {
        return EventItem.findOne({ _id: parent.eventId });
      },
      comments: (parent, args) => {
        return CommentItem.find({ pollId: parent.id });
      },
      likes: (parent, args) => {
        return Like.find({ pollId: parent.id });
      },
      reports: (parent, args) => {
        return Report.find({ pollId: parent.id });
      }
    },

    Mutation: {
      addPoll: async (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        try {
          return await new Poll({
            userId: args.userId,
            eventId: args.eventId,
            text: args.text
          }).save();
        } catch (err) {
          console.log(err);
        }
      },
      updatePoll: async (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        let updatePoll = {};
        if (args.text) updatePoll.text = args.text;
        try {
          return await Poll.findByIdAndUpdate(args._id, updatePoll, {
            new: true
          });
        } catch (err) {
          console.log(err);
        }
      },
      deletePoll: async (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        try {
          return await Poll.findByIdAndDelete(args._id);
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
};
