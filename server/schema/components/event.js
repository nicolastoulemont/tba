const EventItem = require('../../models/Eventitem');
const CommentItem = require('../../models/Comment');
const Poll = require('../../models/Poll');
const Like = require('../../models/Like');
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
    }

    type EventResp {
      success: Boolean!
      event: EventItem
      errors: [Error]
    }

    extend type Query {
      event(id: ID!): EventItem
      events: [EventItem!]!
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
      deleteEvent(_id: ID!): EventResp!
    }
  `,
  // Resolvers
  EventRes: {
    Query: {
      event: (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        return EventItem.findById(args.id);
      },
      onedayevents: (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        return EventItem.find({
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
          startTime: 'ascending'
        });
      },
      events: (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        return EventItem.find({ ispublic: true });
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
      }
    },

    Mutation: {
      addEvent: async (parent, args, { user }) => {
        if (!user)
          return {
            success: false,
            error: 'You are not logged in'
          };
        const { errors, isValid } = await validateEventInput(args);
        if (!isValid) return { success: false, errors };

        let newEvent = new EventItem({
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
        // Save to db
        const event = await newEvent.save();
        return { success: true, event };
      },
      updateEvent: async (parent, args, { user }) => {
        if (!user)
          return {
            success: false,
            error: 'You are not logged in'
          };
        const { errors, isValid } = await validateUpdEventIntput(args);
        if (!isValid) return { success: false, errors };

        let updateEvent = {};
        if (args.name) updateEvent.name = args.name;
        if (args.description) updateEvent.description = args.description;
        if (args.ispublic) updateEvent.ispublic = args.ispublic;
        if (args.categoryOne) updateEvent.categoryOne = args.categoryOne;
        if (args.categoryTwo) updateEvent.categoryTwo = args.categoryTwo;
        if (args.categoryThree) updateEvent.categoryThree = args.categoryThree;
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
        if (!updEvent) {
          return {
            success: false,
            errors: { path: 'save', message: 'Something went wrong' }
          };
        }
        // Save to db
        return { success: true, updEvent };
      },
      deleteEvent: async (parent, args, { user }) => {
        if (!user)
          return {
            success: false,
            error: 'You are not logged in'
          };
        const deleteEvent = await EventItem.findByIdAndDelete(args._id);
        if (!deleteEvent) {
          return { success: false, error };
        } else {
          return { success: true };
        }
      }
    }
  }
};
