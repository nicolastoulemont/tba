const CommentItem = require('../../models/Comment');
const EventItem = require('../../models/Eventitem');
const Like = require('../../models/Like');
const Report = require('../../models/Report');
const User = require('../../models/User');
const { gql } = require('apollo-server-express');

module.exports = {
  CommentType: gql`
    type CommentItem {
      id: ID!
      userId: ID!
      eventId: String
      pollId: String
      commentId: String
      text: String!
      createdAt: String
      updatedAt: String
      event: EventItem
      comment: CommentItem
      comments: [CommentItem]
      poll: Poll
      likes: [Like]
      reports: [Report]
      creator: User
    }

    extend type Query {
      comment(id: ID!): CommentItem
      comments: [CommentItem!]!
    }

    extend type Mutation {
      addComment(
        userId: String!
        eventId: String
        commentId: String
        pollId: String
        text: String!
      ): CommentItem
      updateComment(_id: ID!, text: String): CommentItem
      deleteComment(_id: ID!): CommentItem
    }
  `,
  // Resolvers
  CommentRes: {
    Query: {
      comment: (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        return CommentItem.findById(args.id);
      },
      comments: (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        return CommentItem.find({});
      }
    },
    CommentItem: {
      creator: (parent, args) => {
        return User.findOne({ _id: parent.userId });
      },
      event: (parent, args) => {
        return EventItem.findOne({ _id: parent.eventId });
      },
      comment: (parent, args) => {
        return CommentItem.findOne({ _id: parent.commentId });
      },
      comments: (parent, args) => {
        return CommentItem.find({ commentId: parent.id });
      },
      poll: (parent, args) => {
        return Poll.findOne({ _id: parent.pollId });
      },
      likes: (parent, args) => {
        return Like.find({ commentId: parent.id });
      },
      reports: (parent, args) => {
        return Report.find({ commentId: parent.id });
      }
    },

    Mutation: {
      addComment: (parent, args) => {
        try {
          return new CommentItem({
            userId: args.userId,
            eventId: args.eventId,
            commentId: args.commentId,
            pollId: args.pollId,
            text: args.text
          }).save();
        } catch (e) {
          console.log(e);
        }
      },
      updateComment: async (parent, args, { user }) => {
        if (!user)
          return {
            success: false,
            error: 'You are not logged in'
          };
        try {
          let updateComment = {};
          if (args.text) updateComment.text = args.text;
          return await CommentItem.findByIdAndUpdate(args._id, updateComment, {
            new: true
          });
        } catch (e) {
          console.log(e);
        }
      },
      deleteComment: async (parent, args) => {
        try {
          return await CommentItem.findByIdAndDelete(args._id);
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
};
