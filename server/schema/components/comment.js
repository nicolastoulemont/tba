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
			creator: async (parent, args, { models: { User } }) =>
				await User.findOne({ _id: parent.user_ID }),
			event: async (parent, args, { models: { EventItem } }) =>
				await EventItem.findOne({ _id: parent.event_ID }),
			comment: async (parent, args, { models: { CommentItem } }) =>
				await CommentItem.findOne({ _id: parent.comment_ID }),
			comments: async (parent, args, { models: { CommentItem } }) =>
				await CommentItem.find({ comment_ID: parent.id }),
			poll: async (parent, args, { models: { Poll } }) =>
				await Poll.findOne({ _id: parent.poll_ID }),
			likes: async (parent, args, { models: { Like } }) =>
				await Like.find({ comment_ID: parent.id }),
			reports: async (parent, args, { models: { Report } }) =>
				await Report.find({ comment_ID: parent.id })
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
