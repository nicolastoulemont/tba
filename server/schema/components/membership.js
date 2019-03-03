const Organisation = require('../../models/Organisation');
const Membership = require('../../models/Membership');
const User = require('../../models/User');
const { gql } = require('apollo-server-express');
// const { ValidateAddRegistration } = require('../../validation/registration');

module.exports = {
  MembershipType: gql`
    type Membership {
      id: ID!
      userId: ID!
      organisationId: String!
      admin: Boolean
      accepted: Boolean
      pending: Boolean
      createdAt: String
      updatedAt: String
      organisation: Organisation
      creator: User
    }

    type MembershipResp {
      success: Boolean!
      membership: Membership
      errors: [Error]
    }

    extend type Query {
      membership(id: ID!): Membership
      memberships: [Membership!]!
    }

    extend type Mutation {
      addMembership(
        userId: String!
        organisationId: String!
        admin: Boolean
        accepted: Boolean
        pending: Boolean
      ): MembershipResp!
      updateMembership(
        _id: ID!
        organisationId: String!
        admin: Boolean
        accepted: Boolean
        pending: Boolean
      ): MembershipResp!
      deleteMembership(_id: ID!): MembershipResp!
    }
  `,
  // Resolvers
  MembershipRes: {
    Query: {
      membership: (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        return Membership.findById(args.id);
      },
      memberships: (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        return Membership.find({});
      }
    },

    Membership: {
      organisation: (parent, args) => {
        return Organisation.findOne({ _id: parent.organisationId });
      },
      creator: (parent, args) => {
        return User.findOne({ _id: parent.userId });
      }
    },
    Mutation: {
      addMembership: async (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        // const { errors, isValid } = await ValidateAddRegistration(args);
        // if (!isValid) return { success: false, errors };

        let newMembership = new Membership({
          userId: args.userId,
          organisationId: args.organisationId,
          admin: args.admin,
          accepted: args.accepted,
          pending: args.pending
        });
        // Save to db
        const membership = await newMembership.save();
        return { success: true, membership };
      },
      updateMembership: async (parent, args, { user }) => {
        if (!user)
          return {
            success: false,
            error: 'You are not logged in'
          };
        // const { errors, isValid } = await validateUpdEventIntput(args);
        // if (!isValid) return { success: false, errors };

        let updateMembership = {};
        if (args.organisationId)
          updateEvent.organisationId = args.organisationId;
        if (args.admin) updateEvent.admin = args.admin;
        if (args.accepted) updateEvent.accepted = args.accepted;
        if (args.pending) updateEvent.pending = args.pending;

        const updMembership = await Membership.findByIdAndUpdate(
          args._id,
          updateMembership,
          {
            new: true
          }
        );
        if (!updMembership) {
          return {
            success: false,
            errors: { path: 'save', message: 'Something went wrong' }
          };
        }
        // Save to db
        return { success: true, updMembership };
      },
      deleteMembership: async (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');

        const deleteMembership = await Membership.findByIdAndDelete(args._id);
        if (!deleteMembership) {
          console.log('Delete attempt Failed');
        } else {
          return deleteMembership;
        }
      }
    }
  }
};
