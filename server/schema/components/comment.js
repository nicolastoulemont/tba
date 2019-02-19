const CommentItem = require('../../models/Comment');
const EventItem = require('../../models/Eventitem');
const Like = require('../../models/Like');
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
      comments: [CommentItem]
      poll: Poll
      likes: [Like]
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
      comments: (parent, args) => {
        return CommentItem.find({ _id: parent.commentId });
      },
      poll: (parent, args) => {
        return Poll.findOne({ _id: parent.pollId });
      },
      likes: (parent, args) => {
        return Like.find({ commentId: parent.id });
      }
    },

    Mutation: {
      addComment: (parent, args) => {
        let comment = new CommentItem({
          userId: args.userId,
          eventId: args.eventId,
          commentId: args.commentId,
          pollId: args.pollId,
          text: args.text
        });
        // Save to db
        return comment.save();
      },
      updateComment: (parent, args) => {
        let updateComment = {};

        if (args.text) updateComment.text = args.text;

        const updComment = CommentItem.findByIdAndUpdate(
          args._id,
          updateComment,
          {
            new: true
          }
        );
        if (!updComment) {
          console.log('Update failed');
        }
        return updComment;
      },
      deleteComment: (parent, args) => {
        const deleteComment = CommentItem.findByIdAndDelete(args._id);
        if (!deleteComment) {
          console.log('Delete attempt Failed');
        } else {
          return deleteComment;
        }
      }
    }
  }
};
