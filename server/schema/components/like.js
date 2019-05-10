const { gql, AuthenticationError } = require('apollo-server');
const { ValidateAddLike } = require('../../utils/like/validation');
const { buildLike, deleteLike } = require('../../utils/like/actions');
const {
	findLike,
	findLikes,
	findEventLikes,
	findCommentLikes,
	findUserLikes
} = require('../../utils/like/queries');

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
			creator: [User]
		}

		type LikesResponse implements Response {
			statusCode: Int!
			ok: Boolean!
			errors: [Error]
			body: [Like]
		}

		type LikeResponse implements Response {
			statusCode: Int!
			ok: Boolean!
			errors: [Error]
			body: Like
		}

		extend type Query {
			like(id: ID!): LikeResponse!
			likes: LikesResponse!
			eventLikes(event_ID: ID!): LikesResponse!
			commentLikes(comment_ID: ID!): LikesResponse!
			userLikes(user_ID: ID!): LikesResponse!
		}

		extend type Mutation {
			addLike(
				user_ID: String!
				event_ID: String
				poll_ID: String
				comment_ID: String
			): LikeResponse!
			deleteLike(_id: ID!, user_ID: String!, event_ID: String): LikeResponse!
		}
	`,
	// Resolvers
	LikeRes: {
		Query: {
			like: async (parent, args, { user, models: { Like } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await findLike(args, Like);
			},
			likes: async (parent, args, { user, models: { Like } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await findLikes(args, Like);
			},
			eventLikes: async (parent, args, { user, models: { Like } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await findEventLikes(args, Like);
			},
			commentLikes: async (parent, args, { user, models: { Like } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await findCommentLikes(args, Like);
			},
			userLikes: async (parent, args, { user, models: { Like } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await findUserLikes(args, Like);
			}
		},
		Like: {
			event: async (parent, args, { models: { EventItem } }) =>
				await EventItem.findOne({ _id: parent.event_ID }),
			comment: async (parent, args, { models: { CommentItem } }) =>
				await CommentItem.findOne({ _id: parent.comment_ID }),
			poll: async (parent, args, { models: { Poll } }) => await Poll.find({ _id: parent.poll_ID }),
			creator: async (parent, args, { Loaders: { usersLoader } }) =>
				await usersLoader.load(parent.user_ID)
		},

		Mutation: {
			addLike: async (parent, args, { user, models: { Like, EventItem } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				const { errors, isValid } = await ValidateAddLike(args);
				if (!isValid) return { statusCode: 404, ok: false, errors };
				return await buildLike(args, Like, EventItem);
			},
			deleteLike: async (parent, args, { user, models: { Like, EventItem } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await deleteLike(args, Like, EventItem);
			}
		}
	}
};
