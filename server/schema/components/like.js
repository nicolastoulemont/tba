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
			addLike(userId: String!, eventId: String, pollId: String, commentId: String): LikeResp!
			deleteLike(_id: ID!, userId: String!): Like
		}
	`,
	// Resolvers
	LikeRes: {
		Query: {
			like: async (parent, args, { user, models: { Like } }) => {
				if (!user) throw new Error('Error : You are not logged in');
				try {
					return await Like.findById(args.id);
				} catch (err) {
					throw new Error('Bad request');
				}
			},
			likes: async (parent, args, { user, models: { Like } }) => {
				if (!user) throw new Error('Error : You are not logged in');
				try {
					return await Like.find({});
				} catch (err) {
					throw new Error('Bad request');
				}
			}
		},

		Like: {
			event: (parent, args, { models: { EventItem } }) => {
				return EventItem.findOne({ _id: parent.eventId });
			},
			comment: (parent, args, { models: { CommentItem } }) => {
				return CommentItem.findOne({ _id: parent.commentId });
			},
			poll: (parent, args, { models: { Poll } }) => {
				return Poll.find({ _id: parent.pollId });
			},
			creator: (parent, args, { models: { User } }) => {
				return User.findOne({ _id: parent.userId });
			}
		},

		Mutation: {
			addLike: async (parent, args, { user, models: { Like } }) => {
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
			deleteLike: async (parent, { _id, userId }, { user, models: { Like } }) => {
				if (!user) throw new Error('Error : You are not logged in');
				try {
					const like = await Like.findById(_id);
					if (like.userId === userId) return await Like.findByIdAndDelete(_id);
				} catch (err) {
					console.log(err);
				}
			}
		}
	}
};
