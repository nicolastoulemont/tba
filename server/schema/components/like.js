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
        return Like.findById(args.id);
      },
      likes: (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        return Like.find({});
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

        let newLike = new Like({
          userId: args.userId,
          eventId: args.eventId,
          commentId: args.commentId,
          pollId: args.pollId
        });
        // Save to db
        const like = await newLike.save();
        return { success: true, like };
      },
      deleteLike: async (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');

        const deletelike = await Like.findByIdAndDelete(args._id);
        if (!deletelike) {
          console.log('Delete attempt Failed');
        } else {
          return deletelike;
        }
      }
    }
  }
};
