const { gql } = require('apollo-server-express');
const { validateCommentInput } = require('../../validation/comment');
const { buildComment, updateComment, moderateComment } = require('../../utils/comment');

module.exports = {
	CommentType: gql`
		type CommentItem {
			id: ID!
			user_ID: ID!
			event_ID: String
			poll_ID: String
			comment_ID: String
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
				user_ID: String!
				event_ID: String
				comment_ID: String
				poll_ID: String
				text: String!
			): CommentItem
			updateComment(_id: ID!, text: String): CommentItem
			moderateComment(_id: ID!, user_ID: String!, event_ID: String!): CommentItem
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
				return User.findOne({ _id: parent.user_ID });
			},
			event: (parent, args, { models: { EventItem } }) => {
				return EventItem.findOne({ _id: parent.event_ID });
			},
			comment: (parent, args, { models: { CommentItem } }) => {
				return CommentItem.findOne({ _id: parent.comment_ID });
			},
			comments: (parent, args, { models: { CommentItem } }) => {
				return CommentItem.find({ comment_ID: parent.id });
			},
			poll: (parent, args, { models: { Poll } }) => {
				return Poll.findOne({ _id: parent.poll_ID });
			},
			likes: (parent, args, { models: { Like } }) => {
				return Like.find({ comment_ID: parent.id });
			},
			reports: (parent, args, { models: { Report } }) => {
				return Report.find({ comment_ID: parent.id });
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
