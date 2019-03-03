const EventItem = require('../../models/Eventitem');
const Report = require('../../models/Report');
const User = require('../../models/User');
const Membership = require('../../models/Membership');
const Organisation = require('../../models/Organisation');
const { gql } = require('apollo-server-express');
// const {
//   validateEventInput,
//   validateUpdEventIntput
// } = require('../../validation/event');

module.exports = {
  OrganisationType: gql`
    type Organisation {
      id: ID!
      userId: ID!
      name: String!
      address: String!
      description: String!
      type: String!
      registryId: String
      createdAt: Date
      updatedAt: Date
      creator: User
      admins: [Membership]
      members: [Membership]
      applicants: [Membership]
      reports: [Report]
    }

    type OrganisationResp {
      success: Boolean!
      organisation: Organisation
      errors: [Error]
    }

    extend type Query {
      organisation(id: ID!): Organisation
      organisations: [Organisation!]!
    }

    extend type Mutation {
      addOrganisation(
        userId: String!
        name: String!
        address: String!
        description: String!
        type: String!
        registryId: String
      ): OrganisationResp!
      updateOrganisation(
        _id: ID!
        name: String!
        address: String!
        description: String!
        type: String!
        registryId: String
      ): OrganisationResp!
      deleteOrganisation(_id: ID!): OrganisationResp!
    }
  `,
  // Resolvers
  OrganisationRes: {
    Query: {
      organisation: (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        return Organisation.findById(args.id);
      },
      organisations: (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        return Organisation.find({});
      }
    },
    Organisation: {
      creator: (parent, args) => {
        return User.findOne({ _id: parent.userId });
      },
      admins: (parent, args) => {
        return Membership.find({
          organisationId: parent.id,
          admin: true,
          accepted: true
        });
      },
      members: (parent, args) => {
        return Membership.find({
          organisationId: parent.id,
          admin: false,
          accepted: true
        });
      },
      applicants: (parent, args) => {
        return Membership.find({
          organisationId: parent.id,
          admin: false,
          accepted: false
        });
      },
      reports: (parent, args) => {
        return Report.find({ orgId: parent.id });
      }
    },

    Mutation: {
      addOrganisation: async (parent, args, { user }) => {
        if (!user)
          return {
            success: false,
            error: 'You are not logged in'
          };
        // const { errors, isValid } = await validateEventInput(args);
        // if (!isValid) return { success: false, errors };

        let newOrganisation = new Organisation({
          userId: args.userId,
          name: args.name,
          address: args.address,
          description: args.description,
          type: args.type,
          registryId: args.registryId
        });
        // Save to db
        const organisation = await newOrganisation.save();
        return { success: true, organisation };
      },
      updateOrganisation: async (parent, args, { user }) => {
        if (!user)
          return {
            success: false,
            error: 'You are not logged in'
          };
        // const { errors, isValid } = await validateUpdEventIntput(args);
        // if (!isValid) return { success: false, errors };

        let updateOrganisation = {};
        if (args.name) updateEvent.name = args.name;
        if (args.description) updateEvent.description = args.description;
        if (args.address) updateEvent.address = args.address;
        if (args.type) updateEvent.type = args.type;
        if (args.registryId) updateEvent.registryId = args.registryId;

        const updOrganisation = await Organisation.findByIdAndUpdate(
          args._id,
          updateOrganisation,
          {
            new: true
          }
        );
        if (!updOrganisation) {
          return {
            success: false,
            errors: { path: 'save', message: 'Something went wrong' }
          };
        }
        // Save to db
        return { success: true, updOrganisation };
      },
      deleteOrganisation: async (parent, args, { user }) => {
        if (!user)
          return {
            success: false,
            error: 'You are not logged in'
          };
        const deleteOrganisation = await Organisation.findByIdAndDelete(
          args._id
        );
        if (!deleteOrganisation) {
          return { success: false, error };
        } else {
          return { success: true };
        }
      }
    }
  }
};
