const Poll = require('../../models/Poll');
const EventItem = require('../../models/Eventitem');
const CommentItem = require('../../models/Comment');
const Like = require('../../models/Like');
const User = require('../../models/User');
const { gql } = require('apollo-server-express');
const { ValidateAddLike } = require('../../validation/likes');

module.exports = {
  LikeType: gql`
    type Like {
      id: ID!
      userId: ID!
      eventId: String
      pollId: String
      commentId: String
      createdAt: String
      updatedAt: String
      event: EventItem
      comment: CommentItem
      poll: [Poll]
      creator: User
    }

    type LikeResp {
      success: Boolean!
      like: Like
      errors: [Error]
    }

    extend type Query {
      like(id: ID!): Like
      likes: [Like!]!
    }

    extend type Mutation {
      addLike(
        userId: String!
        eventId: String
        pollId: String
        commentId: String
      ): LikeResp!
      deleteLike(_id: ID!): Like
    }
  `,
  // Resolvers
  LikeRes: {
    Query: {
      like: (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        try {
          return Like.findById(args.id);
        } catch (err) {
          console.log(err);
        }
      },
      likes: (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        try {
          return Like.find({});
        } catch (err) {
          console.log(err);
        }
      }
    },

    Like: {
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
      addLike: async (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        const { errors, isValid } = await ValidateAddLike(args);
        if (!isValid) return { success: false, errors };
        try {
          let like = await new Like({
            userId: args.userId,
            eventId: args.eventId,
            commentId: args.commentId,
            pollId: args.pollId
          }).save();
          return { success: true, like };
        } catch (err) {
          console.log(err);
        }
      },
      deleteLike: async (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        try {
          return await Like.findByIdAndDelete(args._id);
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
};
