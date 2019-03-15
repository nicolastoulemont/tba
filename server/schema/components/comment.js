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
			edited: Boolean
			moderated: Boolean
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
			addComment(userId: String!, eventId: String, commentId: String, pollId: String, text: String!): CommentItem
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
			updateComment: async (parent, args, { user, models: { CommentItem } }) => {
				if (!user)
					return {
						success: false,
						error: 'You are not logged in'
					};
				const { errors, isValid } = await validateCommentInput(args);
				if (!isValid) return { success: false, errors };
				const comment = await CommentItem.findById(args._id);
				if (!comment.moderated) {
					let updateComment = {
						edited: true,
						text: args.text
					};
					try {
						return await CommentItem.findByIdAndUpdate(args._id, updateComment, {
							new: true
						});
					} catch (err) {
						console.log(err);
					}
				} else {
					return null;
				}
			},
			moderateComment: async (parent, { _id, userId, eventId }, { user, models: { CommentItem, EventItem } }) => {
				if (!user)
					return {
						success: false,
						error: 'You are not logged in'
					};
				let deletedComment = {
					moderated: true,
					text: 'Comment deleted'
				};
				let moderatedComment = {
					moderated: true,
					text: 'Comment moderated'
				};
				try {
					const comment = await CommentItem.findById(_id);
					const event = await EventItem.findById(eventId);
					if (comment.userId === userId)
						return await CommentItem.findByIdAndUpdate(_id, deletedComment, {
							new: true
						});
					if (event.userId === userId && comment.userId !== userId)
						return await CommentItem.findByIdAndUpdate(_id, moderatedComment, {
							new: true
						});
				} catch (err) {
					console.log(err);
				}
			}
		}
	}
};
