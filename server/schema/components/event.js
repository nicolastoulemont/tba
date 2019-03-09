const EventItem = require('../../models/Eventitem');
const CommentItem = require('../../models/Comment');
const Poll = require('../../models/Poll');
const Like = require('../../models/Like');
const Report = require('../../models/Report');
const Registration = require('../../models/Registration');
const User = require('../../models/User');
const { gql } = require('apollo-server-express');
const {
  validateEventInput,
  validateUpdEventIntput
} = require('../../validation/event');

module.exports = {
  EventType: gql`
    type EventItem {
      id: ID!
      userId: ID!
      name: String!
      description: String!
      ispublic: Boolean!
      categoryOne: String!
      categoryTwo: String
      categoryThree: String
      location: String!
      startDate: String
      startTime: String
      endDate: String
      endTime: String
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
        userId: String!
        name: String!
        description: String!
        ispublic: Boolean!
        categoryOne: String!
        categoryTwo: String
        categoryThree: String
        location: String!
        startDate: String
        startTime: String
        endDate: String
        endTime: String
      ): EventResp!
      updateEvent(
        _id: ID!
        name: String!
        description: String!
        ispublic: Boolean!
        categoryOne: String!
        categoryTwo: String
        categoryThree: String
        location: String!
        startDate: String
        startTime: String
        endDate: String
        endTime: String
      ): EventResp!
      deleteEvent(_id: ID!, userId: String!): EventResp!
    }
  `,
  // Resolvers
  EventRes: {
    Query: {
      event: async (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        try {
          return await EventItem.findById(args.id);
        } catch (err) {
          throw new Error('Bad request');
        }
      },
      events: async (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        try {
          return await EventItem.find({ ispublic: true }).limit(args.first);
        } catch (err) {
          throw new Error('Bad request');
        }
      },
      searchEventsByNameOrDescription: async (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        try {
          return await EventItem.find({
            $or: [
              {
                $or: [{ name: { $regex: new RegExp(args.search) } }]
              },
              {
                $or: [{ description: { $regex: new RegExp(args.search) } }]
              }
            ]
          })
            .limit(args.limit)
            .sort({ startDate: 'ascending' });
        } catch (err) {
          console.log(err);
        }
      },
      onedayevents: async (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        try {
          return await EventItem.find({
            startDate: args.day,
            ispublic: true,
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
            startDate: 'ascending'
          });
        } catch (err) {
          throw new Error('Bad request');
        }
      }
    },

    EventItem: {
      creator: (parent, args) => {
        return User.findOne({ _id: parent.userId });
      },
      comments: (parent, args) => {
        return CommentItem.find({ eventId: parent.id });
      },
      polls: (parent, args) => {
        return Poll.find({ eventId: parent.id });
      },
      likes: (parent, args) => {
        return Like.find({ eventId: parent.id });
      },
      reports: (parent, args) => {
        return Report.find({ eventId: parent.id });
      },
      registrations: (parent, args) => {
        return Registration.find({ eventId: parent.id });
      }
    },

    Mutation: {
      addEvent: async (parent, args, { user }) => {
        if (!user)
          return {
            success: false,
            error: 'You are not logged in'
          };
        // const { errors, isValid } = await validateEventInput(args);
        // if (!isValid) return { success: false, errors };
        try {
          let event = await new EventItem({
            userId: args.userId,
            name: args.name,
            description: args.description,
            ispublic: args.ispublic,
            categoryOne: args.categoryOne,
            categoryTwo: args.categoryTwo,
            categoryThree: args.categoryThree,
            location: args.location,
            startDate: args.startDate,
            startTime: args.startTime,
            endDate: args.endDate,
            endTime: args.endTime
          });
          console.log(event);
          return { success: true, event };
        } catch (err) {
          console.log(err);
        }
      },
      updateEvent: async (parent, args, { user }) => {
        if (!user)
          return {
            success: false,
            error: 'You are not logged in'
          };
        const { errors, isValid } = await validateUpdEventIntput(args);
        if (!isValid) return { success: false, errors };

        try {
          let updateEvent = {};
          if (args.name) updateEvent.name = args.name;
          if (args.description) updateEvent.description = args.description;
          if (args.ispublic) updateEvent.ispublic = args.ispublic;
          if (args.categoryOne) updateEvent.categoryOne = args.categoryOne;
          if (args.categoryTwo) updateEvent.categoryTwo = args.categoryTwo;
          if (args.categoryThree)
            updateEvent.categoryThree = args.categoryThree;
          if (args.location) updateEvent.location = args.location;
          if (args.startDate) updateEvent.startDate = args.startDate;
          if (args.startTime) updateEvent.startTime = args.startTime;
          if (args.endDate) updateEvent.endDate = args.endDate;
          if (args.endTime) updateEvent.endTime = args.endTime;

          const updEvent = await EventItem.findByIdAndUpdate(
            args._id,
            updateEvent,
            {
              new: true
            }
          );
          return { success: true, updEvent };
        } catch (err) {
          console.log(err);
          return {
            success: false,
            errors: { path: 'save', message: 'Something went wrong' }
          };
        }
      },
      deleteEvent: async (parent, args, { user }) => {
        if (!user)
          return {
            success: false,
            error: 'You are not logged in'
          };
        try {
          const event = await EventItem.findById(args._id);
          if (event.userId === args.userId) {
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
