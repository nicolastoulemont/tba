const CommentItem = require('../../models/Comment');
const EventItem = require('../../models/Eventitem');
const Like = require('../../models/Like');
const Report = require('../../models/Report');
const User = require('../../models/User');
const { gql } = require('apollo-server-express');

const { validateCommentInput } = require('../../validation/comment');

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
      deleteComment(_id: ID!, userId: String!, eventId: String!): CommentItem
    }
  `,
  // Resolvers
  CommentRes: {
    Query: {
      comment: async (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        try {
          return await CommentItem.findById(args.id);
        } catch (err) {
          throw new Error('Bad request');
        }
      },
      comments: async (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        try {
          return await CommentItem.find({});
        } catch (err) {
          throw new Error('Bad request');
        }
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
      addComment: async (parent, args, { user }) => {
        if (!user)
          return {
            success: false,
            error: 'You are not logged in'
          };
        const { errors, isValid } = await validateCommentInput(args);
        if (!isValid) return { success: false, errors };
        try {
          return await new CommentItem({
            userId: args.userId,
            eventId: args.eventId,
            commentId: args.commentId,
            pollId: args.pollId,
            text: args.text
          }).save();
        } catch (err) {
          console.log(err);
        }
      },
      updateComment: async (parent, args, { user }) => {
        if (!user)
          return {
            success: false,
            error: 'You are not logged in'
          };
        const { errors, isValid } = await validateCommentInput(args);
        if (!isValid) return { success: false, errors };
        let updateComment = {};
        if (args.text) updateComment.text = args.text;
        try {
          return await CommentItem.findByIdAndUpdate(args._id, updateComment, {
            new: true
          });
        } catch (err) {
          console.log(err);
        }
      },
      deleteComment: async (parent, args, { user }) => {
        if (!user)
          return {
            success: false,
            error: 'You are not logged in'
          };
        try {
          const comment = await CommentItem.findById(args._id);
          const event = await EventItem.findById(args.eventId);
          if (comment.userId === args.userId || event.userId === args.userId)
            return await CommentItem.findByIdAndDelete(args._id);
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
};
