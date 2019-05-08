const { gql, AuthenticationError } = require('apollo-server');
const { validateEventInput, validateUpdEventIntput } = require('../../utils/event/validation');
const {
	findEvent,
	findEvents,
	mostLikedEventsWithTags,
	mostLikedEventsWithOutTags,
	dailyEventsWithTags,
	dailyEventsWithOutTags,
	searchUserEvents,
	findUserFutureEvents,
	findUserPastEvents,
	findUserEvents
} = require('../../utils/event/queries');
const { buildEvent, updateEvent, deleteEvent } = require('../../utils/event/actions');
const { getDatesFromString } = require('../../utils/general');

module.exports = {
	EventType: gql`
		type EventItem {
			id: ID!
			user_ID: ID!
			name: String!
			abstract: String!
			banner_URL: String
			description: String!
			isPublic: Boolean!
			showComments: Boolean!
			type: String
			price: Float!
			city: String!
			address: String!
			start: Date!
			end: Date!
			createdAt: Date
			updatedAt: Date
			likesCount: Int
			tags: [String]
			creator: User
			comments: [CommentItem]
			polls: [Poll]
			likes: [Like]
			reports: [Report]
			registrations: [Registration]
		}

		type EventsResponse implements Response {
			statusCode: Int!
			ok: Boolean!
			errors: [Error]
			body: [EventItem]
		}

		type EventResponse implements Response {
			statusCode: Int!
			ok: Boolean!
			errors: [Error]
			body: EventItem
		}

		extend type Query {
			event(id: ID!): EventResponse!
			events(limit: Int): EventsResponse!
			mostLikedEvents(
				date: String!
				limit: Int!
				type: String
				price: Float
				tags: [String]
			): EventsResponse!
			searchDailyEvents(
				date: String!
				search: String
				limit: Int!
				sort: String!
				type: String
				price: Float
				tags: [String]
			): EventsResponse!
			searchUserEvents(
				user_ID: ID!
				date: String!
				search: String
				limit: Int!
				sort: String!
			): EventsResponse!
			userFutureHostedEvents(user_ID: ID!, date: String): EventsResponse!
			userPastHostedEvents(user_ID: ID!, date: String): EventsResponse!
			userEvents(user_ID: ID!): EventsResponse!
		}

		extend type Mutation {
			addEvent(
				user_ID: String!
				name: String!
				abstract: String!
				banner_URL: String
				description: String!
				isPublic: Boolean!
				showComments: Boolean!
				type: String
				price: Float!
				city: String!
				address: String!
				start: String!
				end: String!
				tags: [String]
			): EventResponse!
			updateEvent(
				_id: ID!
				name: String!
				abstract: String!
				banner_URL: String
				description: String!
				isPublic: Boolean!
				showComments: Boolean!
				type: String
				price: Float!
				city: String!
				address: String!
				start: String!
				end: String!
				tags: [String]
			): EventResponse!
			deleteEvent(_id: ID!, user_ID: String!): EventResponse!
		}
	`,
	// Resolvers
	EventRes: {
		Query: {
			event: async (parent, args, { models: { EventItem } }) => {
				return await findEvent(args, EventItem);
			},
			events: async (parent, args, { user, models: { EventItem } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await findEvents(args, EventItem);
			},
			mostLikedEvents: async (parent, args, { user, models: { EventItem } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				const { date, dayafter } = getDatesFromString(args.date);
				if (args.tags.length !== 0) {
					return await mostLikedEventsWithTags(date, dayafter, args, EventItem);
				} else if (args.tags.length === 0) {
					return await mostLikedEventsWithOutTags(date, dayafter, args, EventItem);
				}
			},
			searchDailyEvents: async (parent, args, { user, models: { EventItem } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				const { date, dayafter } = getDatesFromString(args.date);
				if (args.tags.length !== 0) {
					return await dailyEventsWithTags(date, dayafter, args, EventItem);
				} else if (args.tags.length === 0) {
					return await dailyEventsWithOutTags(date, dayafter, args, EventItem);
				}
			},
			searchUserEvents: async (parent, args, { user, models: { EventItem } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				const { date, dayafter } = getDatesFromString(args.date);
				return await searchUserEvents(date, dayafter, args, EventItem);
			},
			userFutureHostedEvents: async (parent, args, { user, models: { EventItem } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await findUserFutureEvents(args, EventItem);
			},
			userPastHostedEvents: async (parent, args, { user, models: { EventItem } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await findUserPastEvents(args, EventItem);
			},
			userEvents: async (parent, args, { user, models: { EventItem } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await findUserEvents(args, EventItem);
			}
		},

		EventItem: {
			creator: async (parent, args, { models: { User } }) =>
				await User.findOne({ _id: parent.user_ID }),
			comments: async (parent, args, { models: { CommentItem } }) =>
				await CommentItem.find({ event_ID: parent.id }),
			polls: async (parent, args, { models: { Poll } }) => await Poll.find({ event_ID: parent.id }),
			likes: async (parent, args, { models: { Like } }) => await Like.find({ event_ID: parent.id }),
			reports: async (parent, args, { models: { Report } }) =>
				await Report.find({ event_ID: parent.id }),
			registrations: async (parent, args, { models: { Registration } }) =>
				await Registration.find({ event_ID: parent.id })
		},

		Mutation: {
			addEvent: async (parent, args, { user, models: { EventItem } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				const { errors, isValid } = await validateEventInput(args);
				if (!isValid) return { statusCode: 400, ok: false, errors };
				return await buildEvent(args, EventItem);
			},
			updateEvent: async (parent, args, { user, models: { EventItem } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				const { errors, isValid } = await validateUpdEventIntput(args);
				if (!isValid) return { statusCode: 400, ok: false, errors };
				return await updateEvent(args, EventItem);
			},
			deleteEvent: async (parent, args, { user, models: { EventItem } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await deleteEvent(args, EventItem);
			}
		}
	}
};
