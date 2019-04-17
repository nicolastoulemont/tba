const { gql } = require('apollo-server');
const { validateEventInput, validateUpdEventIntput } = require('../../validation/event');
const { buildEvent, updateEvent } = require('../../utils/event');

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
			type: String
			price: Float!
			city: String!
			address: String!
			start: Date!
			end: Date!
			createdAt: Date
			updatedAt: Date
			tags: [String]
			creator: User
			comments: [CommentItem]
			polls: [Poll]
			likes: [Like]
			reports: [Report]
			registrations: [Registration]
		}

		type EventResp {
			success: Boolean!
			event: EventItem
			errors: [Error]
		}

		extend type Query {
			event(id: ID!): EventItem
			events(limit: Int): [EventItem!]!
			searchDailyEvents(
				date: String!
				search: String
				limit: Int!
				sort: String!
				type: String
				price: Float
			): [EventItem!]!
			userFutureHostedEvents(user_ID: ID!, date: String): [EventItem!]!
			userPastHostedEvents(user_ID: ID!, date: String): [EventItem!]!
		}

		extend type Mutation {
			addEvent(
				user_ID: String!
				name: String!
				abstract: String!
				banner_URL: String
				description: String!
				isPublic: Boolean!
				type: String
				price: Float!
				city: String!
				address: String!
				start: String!
				end: String!
				tags: [String]
			): EventResp!
			updateEvent(
				_id: ID!
				name: String!
				abstract: String!
				banner_URL: String
				description: String!
				isPublic: Boolean!
				type: String
				price: Float!
				city: String!
				address: String!
				start: String!
				end: String!
				tags: [String]
			): EventResp!
			deleteEvent(_id: ID!, user_ID: String!): EventResp!
		}
	`,
	// Resolvers
	EventRes: {
		Query: {
			event: async (parent, args, { models: { EventItem } }) => {
				try {
					return await EventItem.findById(args.id);
				} catch (err) {
					throw new Error('Bad request');
				}
			},
			events: async (parent, args, { user, models: { EventItem } }) => {
				if (!user) throw new Error('Error : You are not logged in');
				try {
					return await EventItem.find({ isPublic: true })
						.sort({ _id: 'descending' })
						.limit(args.limit);
				} catch (err) {
					throw new Error('Bad request');
				}
				// const searchedTags = ['orange', 'green'];
				// try {
				// 	return await EventItem.find({ isPublic: true, tags: { $in: searchedTags } })
				// 		.sort({ _id: 'descending' })
				// 		.limit(args.limit);
				// } catch (err) {
				// 	throw new Error('Bad request');
				// }
			},
			searchDailyEvents: async (parent, args, { user, models: { EventItem } }) => {
				if (!user) throw new Error('Error : You are not logged in');
				const date = new Date(args.date);
				const dayafter = new Date(new Date(args.date).setDate(new Date(args.date).getDate() + 1));
				try {
					return EventItem.find({
						start: { $gte: date, $lte: dayafter },
						isPublic: true,
						type: { $regex: new RegExp(args.type, 'i') },
						price: { $lte: args.price },
						$or: [
							{ name: { $regex: new RegExp(args.search, 'i') } },
							{ abstract: { $regex: new RegExp(args.search, 'i') } }
						]
					})
						.sort({ start: args.sort })
						.limit(args.limit);
				} catch (err) {
					throw new Error('Bad request');
				}
			},
			userFutureHostedEvents: async (parent, args, { user, models: { EventItem } }) => {
				if (!user) throw new Error('Error : You are not logged in');
				const date = new Date(args.date);
				try {
					return await EventItem.find({ user_ID: args.user_ID, start: { $gte: date } });
				} catch (err) {
					throw new Error('Bad request');
				}
			},
			userPastHostedEvents: async (parent, args, { user, models: { EventItem } }) => {
				if (!user) throw new Error('Error : You are not logged in');
				const date = new Date(args.date);
				try {
					return await EventItem.find({ user_ID: args.user_ID, start: { $lte: date } }).sort({
						start: 'descending'
					});
				} catch (err) {
					throw new Error('Bad request');
				}
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
				if (!user)
					return {
						success: false,
						errors: [
							{
								path: 'auth',
								message: 'You are not logged in'
							}
						]
					};
				// const { errors, isValid } = await validateEventInput(args);
				// if (!isValid) return { success: false, errors };
				return await buildEvent(args, EventItem);
			},
			updateEvent: async (parent, args, { user, models: { EventItem } }) => {
				if (!user)
					return {
						success: false,
						error: 'You are not logged in'
					};
				// const { errors, isValid } = await validateUpdEventIntput(args);
				// if (!isValid) return { success: false, errors };

				return await updateEvent(args, EventItem);
			},
			deleteEvent: async (parent, args, { user, models: { EventItem } }) => {
				if (!user)
					return {
						success: false,
						error: 'You are not logged in'
					};
				try {
					const event = await EventItem.findById(args._id);
					if (event.user_ID === args.user_ID) {
						return {
							success: true,
							deleteEvent: await EventItem.findByIdAndDelete(args._id)
						};
					} else {
						return { success: false, error: new Error('Bad request') };
					}
				} catch (err) {
					console.log(err);
					return { success: false, error };
				}
			}
		}
	}
};
