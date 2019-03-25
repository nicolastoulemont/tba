const { gql } = require('apollo-server-express');
const { validateEventInput, validateUpdEventIntput } = require('../../validation/event');
const { buildEvent, updateEvent } = require('../../utils/event');

module.exports = {
	EventType: gql`
		type EventItem {
			id: ID!
			user_ID: ID!
			name: String!
			abstract: String!
			description: String!
			isPublic: Boolean!
			categoryOne: String!
			categoryTwo: String
			categoryThree: String
			location: String!
			start: Date!
			end: Date!
			createdAt: Date
			updatedAt: Date
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
			events(first: Int): [EventItem!]!
			searchEventsByDate(date: String): [EventItem!]!
			searchEventsByNameOrDescription(search: String, limit: Int): [EventItem!]!
			onedayevents(
				day: String!
				interestOne: String!
				interestTwo: String
				interestThree: String
			): [EventItem!]!
		}

		extend type Mutation {
			addEvent(
				user_ID: String!
				name: String!
				abstract: String!
				description: String!
				isPublic: Boolean!
				categoryOne: String!
				categoryTwo: String
				categoryThree: String
				location: String!
				start: Date!
				end: Date!
			): EventResp!
			updateEvent(
				_id: ID!
				name: String!
				abstract: String!
				description: String!
				isPublic: Boolean!
				categoryOne: String!
				categoryTwo: String
				categoryThree: String
				location: String!
				start: Date!
				end: Date!
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
						.sort({ _id: 'ascending' })
						.limit(args.first);
				} catch (err) {
					throw new Error('Bad request');
				}
			},
			searchEventsByDate: async (parent, args, { user, models: { EventItem } }) => {
				if (!user) throw new Error('Error : You are not logged in');
				const date = new Date(args.date);
				const dayafter = new Date(new Date(args.date).setDate(new Date(args.date).getDate() + 1));
				try {
					return await EventItem.find({
						start: { $gte: date, $lte: dayafter }
					})
						.sort({ start: 'ascending' })
						.limit(args.limit);
				} catch (err) {
					console.log(err);
				}
			},
			searchEventsByNameOrDescription: async (parent, args, { user, models: { EventItem } }) => {
				if (!user) throw new Error('Error : You are not logged in');
				try {
					return await EventItem.find({
						$or: [
							{ name: { $regex: new RegExp(args.search) } },
							{ description: { $regex: new RegExp(args.search) } }
						]
					})
						.sort({ start: 'ascending' })
						.limit(args.limit);
				} catch (err) {
					console.log(err);
				}
			},
			onedayevents: async (parent, args, { user, models: { EventItem } }) => {
				if (!user) throw new Error('Error : You are not logged in');
				const date = new Date(args.day);
				const dayafter = new Date(new Date(args.day).setDate(new Date(args.day).getDate() + 1));
				try {
					return await EventItem.find({
						start: { $gte: date, $lte: dayafter },
						isPublic: true,
						$or: [
							{
								$or: [
									{ categoryOne: args.interestOne },
									{ categoryOne: args.interestTwo },
									{ categoryOne: args.interestThree }
								]
							},
							{
								$or: [
									{ categoryTwo: args.interestOne },
									{ categoryTwo: args.interestTwo },
									{ categoryTwo: args.interestThree }
								]
							},
							{
								$or: [
									{ categoryThree: args.interestOne },
									{ categoryThree: args.interestTwo },
									{ categoryThree: args.interestThree }
								]
							}
						]
					}).sort({
						start: 'ascending'
					});
				} catch (err) {
					throw new Error('Bad request');
				}
			}
		},

		EventItem: {
			creator: async (parent, args, { models: { User } }) => {
				return await User.findOne({ _id: parent.user_ID });
			},
			comments: async (parent, args, { models: { CommentItem } }) => {
				return await CommentItem.find({ event_ID: parent.id });
			},
			polls: async (parent, args, { models: { Poll } }) => {
				return await Poll.find({ event_ID: parent.id });
			},
			likes: async (parent, args, { models: { Like } }) => {
				return await Like.find({ event_ID: parent.id });
			},
			reports: async (parent, args, { models: { Report } }) => {
				return await Report.find({ event_ID: parent.id });
			},
			registrations: async (parent, args, { models: { Registration } }) => {
				return await Registration.find({ event_ID: parent.id });
			}
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
				const { errors, isValid } = await validateUpdEventIntput(args);
				if (!isValid) return { success: false, errors };

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
