const { gql, AuthenticationError } = require('apollo-server');
const { validateCommentInput } = require('../../utils/comment/validation');
const {
	buildComment,
	updateComment,
	pinComment,
	moderateComment
} = require('../../utils/comment/actions');
const {
	findComment,
	findComments,
	findEventComments,
	findUserComments
} = require('../../utils/comment/queries');

module.exports = {
	CommentType: gql`
		type CommentItem {
			id: ID!
			user_ID: ID!
			event_ID: String
			poll_ID: String
			text: String!
			pinned: Boolean
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
			creator: [User]
		}

		type CommentsResponse implements Response {
			statusCode: Int!
			ok: Boolean!
			errors: [Error]
			body: [CommentItem]
		}

		type CommentResponse implements Response {
			statusCode: Int!
			ok: Boolean!
			errors: [Error]
			body: CommentItem
		}

		extend type Query {
			comment(id: ID!): CommentResponse!
			comments: CommentsResponse!
			eventComments(event_ID: ID!): CommentsResponse!
			userComments(user_ID: ID!): CommentsResponse!
		}

		extend type Mutation {
			addComment(
				user_ID: String!
				event_ID: String
				comment_ID: String
				poll_ID: String
				text: String!
			): CommentResponse!
			updateComment(_id: ID!, text: String): CommentResponse!
			pinComment(_id: ID!, user_ID: ID!, event_ID: ID!, pinned: Boolean!): CommentResponse!
			moderateComment(_id: ID!, user_ID: String!, event_ID: String!): CommentResponse!
		}
	`,
	// Resolvers
	CommentRes: {
		Query: {
			comment: async (parent, args, { user, models: { CommentItem } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await findComment(args, CommentItem);
			},
			comments: async (parent, args, { user, models: { CommentItem } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await findComments(args, CommentItem);
			},
			eventComments: async (parent, args, { user, models: { CommentItem } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await findEventComments(args, CommentItem);
			},
			userComments: async (parent, args, { user, models: { CommentItem } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await findUserComments(args, CommentItem);
			}
		},
		CommentItem: {
			creator: async (parent, args, { Loaders: { usersLoader } }) =>
				await usersLoader.load(parent.user_ID),
			event: async (parent, args, { models: { EventItem } }) =>
				await EventItem.findOne({ _id: parent.event_ID }),
			poll: async (parent, args, { models: { Poll } }) =>
				await Poll.findOne({ _id: parent.poll_ID }),
			likes: async (parent, args, { models: { Like } }) =>
				await Like.find({ comment_ID: parent.id }),
			reports: async (parent, args, { models: { Report } }) =>
				await Report.find({ comment_ID: parent.id })
		},

		Mutation: {
			addComment: async (parent, args, { user, models: { CommentItem } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				const { errors, isValid } = await validateCommentInput(args);
				if (!isValid) return { statusCode: 404, ok: false, errors };
				return await buildComment(args, CommentItem);
			},
			updateComment: async (parent, args, { user, models: { User, CommentItem } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				const { errors, isValid } = await validateCommentInput(args);
				if (!isValid) return { statusCode: 404, ok: false, errors };
				return await updateComment(args, user, CommentItem);
			},
			pinComment: async (parent, args, { user, models: { CommentItem, EventItem } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await pinComment(args, CommentItem, EventItem);
			},
			moderateComment: async (parent, args, { user, models: { CommentItem, EventItem } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await moderateComment(args, CommentItem, EventItem);
			}
		}
	}
};
