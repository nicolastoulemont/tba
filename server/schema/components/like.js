const { gql, AuthenticationError } = require('apollo-server');
const { ValidateAddLike } = require('../../utils/like/validation');
const { buildLike, deleteLike } = require('../../utils/like/actions');

module.exports = {
	LikeType: gql`
		type Like {
			id: ID!
			user_ID: ID!
			event_ID: String
			poll_ID: String
			comment_ID: String
			createdAt: Date
			updatedAt: Date
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
			eventLikes(event_ID: ID!): [Like!]!
			commentLikes(comment_ID: ID!): [Like!]!
		}

		extend type Mutation {
			addLike(user_ID: String!, event_ID: String, poll_ID: String, comment_ID: String): LikeResp!
			deleteLike(_id: ID!, user_ID: String!): Like
		}
	`,
	// Resolvers
	LikeRes: {
		Query: {
			like: async (parent, args, { user, models: { Like } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				try {
					return await Like.findById(args.id);
				} catch (err) {
					throw new Error('Bad request');
				}
			},
			likes: async (parent, args, { user, models: { Like } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				try {
					return await Like.find({});
				} catch (err) {
					throw new Error('Bad request');
				}
			},
			eventLikes: async (parent, args, { user, models: { Like } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				try {
					return await Like.find({ event_ID: args.event_ID });
				} catch (err) {
					throw new Error('Bad request');
				}
			},
			commentLikes: async (parent, args, { user, models: { Like } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				try {
					return await Like.find({ comment_ID: args.comment_ID });
				} catch (err) {
					throw new Error('Bad request');
				}
			}
		},

		Like: {
			event: async (parent, args, { models: { EventItem } }) =>
				await EventItem.findOne({ _id: parent.event_ID }),
			comment: async (parent, args, { models: { CommentItem } }) =>
				await CommentItem.findOne({ _id: parent.comment_ID }),
			poll: async (parent, args, { models: { Poll } }) => await Poll.find({ _id: parent.poll_ID }),
			creator: async (parent, args, { models: { User } }) =>
				await User.findOne({ _id: parent.user_ID })
		},

		Mutation: {
			addLike: async (parent, args, { user, models: { Like } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				const { errors, isValid } = await ValidateAddLike(args);
				if (!isValid) return { success: false, errors };
				return await buildLike(args, Like);
			},
			deleteLike: async (parent, args, { user, models: { Like } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await deleteLike(args, Like);
			}
		}
	}
};
