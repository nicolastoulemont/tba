const { gql } = require('apollo-server-express');
const { validateCommentInput } = require('../../validation/comment');
const { buildComment, updateComment, moderateComment } = require('../../builders/comment');

module.exports = {
	CommentType: gql`
		type CommentItem {
			id: ID!
			userId: ID!
			eventId: String
			pollId: String
			commentId: String
			text: String!
			moderated: Boolean
			moderationMsg: String
			createdAt: Date
			updatedAt: Date
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
			moderateComment(_id: ID!, userId: String!, eventId: String!): CommentItem
		}
	`,
	// Resolvers
	CommentRes: {
		Query: {
			comment: async (parent, args, { user, models: { CommentItem } }) => {
				if (!user) throw new Error('Error : You are not logged in');
				try {
					return await CommentItem.findById(args.id);
				} catch (err) {
					throw new Error('Bad request');
				}
			},
			comments: async (parent, args, { user, models: { CommentItem } }) => {
				if (!user) throw new Error('Error : You are not logged in');
				try {
					return await CommentItem.find({});
				} catch (err) {
					throw new Error('Bad request');
				}
			}
		},
		CommentItem: {
			creator: (parent, args, { models: { User } }) => {
				return User.findOne({ _id: parent.userId });
			},
			event: (parent, args, { models: { EventItem } }) => {
				return EventItem.findOne({ _id: parent.eventId });
			},
			comment: (parent, args, { models: { CommentItem } }) => {
				return CommentItem.findOne({ _id: parent.commentId });
			},
			comments: (parent, args, { models: { CommentItem } }) => {
				return CommentItem.find({ commentId: parent.id });
			},
			poll: (parent, args, { models: { Poll } }) => {
				return Poll.findOne({ _id: parent.pollId });
			},
			likes: (parent, args, { models: { Like } }) => {
				return Like.find({ commentId: parent.id });
			},
			reports: (parent, args, { models: { Report } }) => {
				return Report.find({ commentId: parent.id });
			}
		},

		Mutation: {
			addComment: async (parent, args, { user, models: { CommentItem } }) => {
				if (!user)
					return {
						success: false,
						error: 'You are not logged in'
					};
				const { errors, isValid } = await validateCommentInput(args);
				if (!isValid) return { success: false, errors };
				return await buildComment(args, CommentItem);
			},
			updateComment: async (parent, args, { user, models: { User, CommentItem } }) => {
				if (!user)
					return {
						success: false,
						error: 'You are not logged in'
					};
				const { errors, isValid } = await validateCommentInput(args);
				if (!isValid) return { success: false, errors };
				return await updateComment(args, user, CommentItem);
			},
			moderateComment: async (parent, args, { user, models: { CommentItem, EventItem } }) => {
				if (!user)
					return {
						success: false,
						error: 'You are not logged in'
					};
				return await moderateComment(args, CommentItem, EventItem);
			}
		}
	}
};
