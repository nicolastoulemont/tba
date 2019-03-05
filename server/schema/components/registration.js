const EventItem = require('../../models/Eventitem');
const User = require('../../models/User');
const Registration = require('../../models/Registration');
const { gql } = require('apollo-server-express');
const { ValidateAddRegistration } = require('../../validation/registration');

module.exports = {
  RegistrationType: gql`
    type Registration {
      id: ID!
      userId: ID!
      eventId: String
      createdAt: String
      updatedAt: String
      event: EventItem
      creator: User
    }

    type RegistrationResp {
      success: Boolean!
      registration: Registration
      errors: [Error]
    }

    extend type Query {
      registration(id: ID!): Registration
      registrations: [Registration!]!
    }

    extend type Mutation {
      addRegistration(userId: String!, eventId: String!): RegistrationResp!
      deleteRegistration(_id: ID!): Registration
    }
  `,
  // Resolvers
  RegistrationRes: {
    Query: {
      registration: (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        return Registration.findById(args.id);
      },
      registrations: (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        return Registration.find({});
      }
    },

    Registration: {
      event: (parent, args) => {
        return EventItem.findOne({ _id: parent.eventId });
      },
      creator: (parent, args) => {
        return User.findOne({ _id: parent.userId });
      }
    },

    Mutation: {
      addRegistration: async (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        const { errors, isValid } = await ValidateAddRegistration(args);
        if (!isValid) return { success: false, errors };
        try {
          let newRegistration = await new Registration({
            userId: args.userId,
            eventId: args.eventId
          }).save();
          return { success: true, newRegistration };
        } catch (e) {
          console.log(e);
          return { success: false, error };
        }
      },
      deleteRegistration: async (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        try {
          return await Registration.findByIdAndDelete(args._id);
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
};
