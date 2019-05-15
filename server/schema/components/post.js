const { gql, AuthenticationError } = require('apollo-server');
const { validatePostInput, validateUpdPostIntput } = require('../../utils/post/validation');
const {
	findPost,
	findPosts,
	dailyPostsWithOutTags,
	dailyPostsWithTags,
	searchUserPosts,
	findUserPosts
} = require('../../utils/post/queries');
const { buildPost, updatePost, deletePost } = require('../../utils/post/actions');
const { getDatesFromString, validateSearchInput } = require('../../utils/general');

module.exports = {
	PostType: gql`
		type PostItem {
			id: ID!
			user_ID: ID!
			name: String!
			abstract: String!
			description: String!
			authorName: String
			author_URL: String
			authorPicture_URL: String
			postOrigin_URL: String
			type: String
			createdAt: Date
			updatedAt: Date
			scraped: Boolean!
			tags: [String]
			creator: [User]
			reports: [Report]
		}

		type PostsResponse implements Response {
			statusCode: Int!
			ok: Boolean!
			errors: [Error]
			body: [PostItem]
		}

		type PostResponse implements Response {
			statusCode: Int!
			ok: Boolean!
			errors: [Error]
			body: PostItem
		}

		extend type Query {
			post(id: ID!): PostResponse!
			posts(limit: Int): PostsResponse!
			searchDailyPosts(
				date: String!
				search: String
				limit: Int!
				sort: String!
				type: String
				tags: [String]
			): PostsResponse!
			searchUserPosts(
				user_ID: ID!
				date: String!
				search: String
				limit: Int!
				sort: String!
			): PostsResponse!
			userPosts(user_ID: ID!): PostsResponse!
		}

		extend type Mutation {
			addPost(
				user_ID: String!
				name: String!
				abstract: String!
				description: String!
				authorName: String
				author_URL: String
				authorPicture_URL: String
				postOrigin_URL: String
				type: String
				scraped: Boolean!
				tags: [String]
			): PostResponse!
			updatePost(
				_id: ID!
				name: String!
				abstract: String!
				description: String!
				authorName: String
				author_URL: String
				authorPicture_URL: String
				postOrigin_URL: String
				type: String
				scraped: Boolean!
				tags: [String]
			): PostResponse!
			deletePost(_id: ID!, user_ID: String!): PostResponse!
		}
	`,
	// Resolvers
	PostRes: {
		Query: {
			post: async (parent, args, { models: { Post } }) => {
				return await findPost(args, Post);
			},
			posts: async (parent, args, { user, models: { Post } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await findPosts(args, Post);
			},
			searchDailyPosts: async (parent, args, { user, models: { Post } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				const { errors, isValid } = validateSearchInput(args);
				if (!isValid) return { statusCode: 400, ok: false, errors };
				const { date, dayafter } = getDatesFromString(args.date);
				if (args.tags.length !== 0) {
					return await dailyPostsWithTags(date, dayafter, args, Post);
				} else if (args.tags.length === 0) {
					return await dailyPostsWithOutTags(date, dayafter, args, Post);
				}
			},
			searchUserPosts: async (parent, args, { user, models: { Post } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				const { errors, isValid } = validateSearchInput(args);
				if (!isValid) return { statusCode: 400, ok: false, errors };
				const { date, dayafter } = getDatesFromString(args.date);
				return await searchUserPosts(date, dayafter, args, Post);
			},
			userPosts: async (parent, args, { user, models: { Post } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await findUserPosts(args, Post);
			}
		},

		PostItem: {
			creator: async (parent, args, { Loaders: { usersLoader } }) =>
				await usersLoader.load(parent.user_ID),
			reports: async (parent, args, { Loaders: { postReportsLoader } }) =>
				await postReportsLoader.load(parent.id)
		},

		Mutation: {
			addPost: async (parent, args, { user, models: { Post } }) => {
				// if (!user) throw new AuthenticationError('Please login to get the requested response');
				const { errors, isValid } = await validatePostInput(args);
				if (!isValid) return { statusCode: 400, ok: false, errors };
				return await buildPost(args, Post);
			},
			updatePost: async (parent, args, { user, models: { Post } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				const { errors, isValid } = await validateUpdPostIntput(args);
				if (!isValid) return { statusCode: 400, ok: false, errors };
				return await updatePost(args, Post);
			},
			deletePost: async (parent, args, { user, models: { Post } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await deletePost(args, Post);
			}
		}
	}
};
