const EventItem = require('../../models/Eventitem');
const Report = require('../../models/Report');
const User = require('../../models/User');
const Membership = require('../../models/Membership');
const Organisation = require('../../models/Organisation');
const { gql } = require('apollo-server-express');
const {
  validateOrgInput,
  validateUpdOrgIntput
} = require('../../validation/organisation');

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
      searchOrganisationsByName(search: String, limit: Int): [Organisation!]!
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
      organisation: async (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        try {
          return await Organisation.findById(args.id);
        } catch (err) {
          throw new Error('Bad request');
        }
      },
      searchOrganisationsByName: async (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        try {
          return await Organisation.find({
            name: { $regex: new RegExp(args.search) }
          })
            .limit(args.limit)
            .sort({ name: 1 });
        } catch (err) {
          throw new Error('Bad request');
        }
      },
      organisations: async (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        try {
          return await Organisation.find({});
        } catch (err) {
          throw new Error('Bad request');
        }
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
          accepted: true,
          pending: false
        });
      },
      members: (parent, args) => {
        return Membership.find({
          organisationId: parent.id,
          admin: false,
          accepted: true,
          pending: false
        });
      },
      applicants: (parent, args) => {
        return Membership.find({
          organisationId: parent.id,
          admin: false,
          accepted: false,
          pending: true
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
        const { errors, isValid } = await validateOrgInput(args);
        if (!isValid) return { success: false, errors };
        try {
          let organisation = await new Organisation({
            userId: args.userId,
            name: args.name,
            address: args.address,
            description: args.description,
            type: args.type,
            registryId: args.registryId
          }).save();
          return { success: true, organisation };
        } catch (e) {
          console.log(e);
        }
      },
      updateOrganisation: async (parent, args, { user }) => {
        if (!user)
          return {
            success: false,
            error: 'You are not logged in'
          };
        const { errors, isValid } = await validateUpdOrgIntput(args);
        if (!isValid) return { success: false, errors };

        let updateOrganisation = {};
        if (args.name) updateEvent.name = args.name;
        if (args.description) updateEvent.description = args.description;
        if (args.address) updateEvent.address = args.address;
        if (args.type) updateEvent.type = args.type;
        if (args.registryId) updateEvent.registryId = args.registryId;

        try {
          const updOrganisation = await Organisation.findByIdAndUpdate(
            args._id,
            updateOrganisation,
            {
              new: true
            }
          );
          return { success: true, updOrganisation };
        } catch (err) {
          console.log(err);
          return {
            success: false,
            errors: { path: 'save', message: 'Something went wrong' }
          };
        }
      },
      deleteOrganisation: async (parent, args, { user }) => {
        if (!user)
          return {
            success: false,
            error: 'You are not logged in'
          };
        try {
          const deleteOrganisation = await Organisation.findByIdAndDelete(
            args._id
          );
          if (deleteOrganisation) return { success: true };
        } catch (e) {
          console.log(e);
          return { success: false, error };
        }
      }
    }
  }
};
