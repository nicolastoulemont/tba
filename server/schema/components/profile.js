const Profile = require('../../models/Profile');
const Organisation = require('../../models/Organisation');
const User = require('../../models/User');
const { gql } = require('apollo-server-express');

module.exports = {
  ProfileType: gql`
    type Profile {
      id: ID!
      userId: ID!
      name: String!
      organisation: String
      organisationId: String
      organisationAdminId: String
      position: String!
      interestOne: String!
      interestTwo: String
      interestThree: String
      bio: String
      twitter: String
      linkedin: String
      createdAt: String
      updatedAt: String
      creator: User
      member: Organisation
      admin: Organisation
    }

    type ProfileResp {
      success: Boolean!
      profile: Profile
      error: String
    }

    extend type Query {
      profile(id: ID!): Profile
      profiles: [Profile!]!
    }

    extend type Mutation {
      addProfile(
        userId: String!
        name: String!
        organisation: String
        organisationId: String
        organisationAdminId: String
        position: String!
        interestOne: String!
        interestTwo: String
        interestThree: String
        bio: String
        twitter: String
        linkedin: String
      ): ProfileResp
      updateProfile(
        _id: ID!
        name: String
        organisation: String
        organisationId: String
        organisationAdminId: String
        position: String
        interestOne: String!
        interestTwo: String
        interestThree: String
        bio: String
        twitter: String
        linkedin: String
      ): ProfileResp
      deleteProfile(_id: ID!): ProfileResp
    }
  `,
  // Resolvers
  ProfileRes: {
    Query: {
      profile: (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        return Profile.findById(args.id);
      },
      profiles: (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        return Profile.find({});
      }
    },

    Profile: {
      creator: (parent, args) => {
        return User.findOne({ _id: parent.userId });
      },
      member: (parent, args) => {
        return Organisation.findOne({ _id: parent.organisationId });
      },
      admin: (parent, args) => {
        return Organisation.findOne({ _id: parent.organisationAdminId });
      }
    },

    Mutation: {
      addProfile: async (parent, args) => {
        let newProfile = new Profile({
          userId: args.userId,
          name: args.name,
          organisation: args.organisation,
          organisationId: args.organisationId,
          organisationAdminId: args.organisationAdminId,
          position: args.position,
          interestOne: args.interestOne,
          interestTwo: args.interestTwo,
          interestThree: args.interestThree,
          bio: args.bio,
          twitter: args.twitter,
          linkedin: args.linkedin
        });
        // Save to db
        const profile = await newProfile.save();
        return { success: true, profile };
      },
      updateProfile: async (parent, args) => {
        let updateProfile = {};
        if (args.name) updateProfile.name = args.name;
        if (args.organisation) updateProfile.organisation = args.organisation;
        if (args.organisationId)
          updateProfile.organisationId = args.organisationId;
        if (args.organisationAdminId)
          updateProfile.organisationAdminId = args.organisationAdminId;
        if (args.position) updateProfile.position = args.position;
        if (args.interestOne) updateProfile.interestOne = args.interestOne;
        if (args.interestTwo) updateProfile.interestTwo = args.interestTwo;
        if (args.interestThree)
          updateProfile.interestThree = args.interestThree;
        if (args.bio) updateProfile.bio = args.bio;
        if (args.twitter) updateProfile.twitter = args.twitter;
        if (args.linkedin) updateProfile.linkedin = args.linkedin;

        const updProfile = await Profile.findByIdAndUpdate(
          args._id,
          updateProfile,
          {
            new: true
          }
        );
        if (!updProfile) {
          console.log('Update failed');
        }
        // Save to db
        return { success: true, profile: updProfile };
      },
      deleteProfile: (parent, args) => {
        const deleteProfile = Profile.findByIdAndDelete(args._id);
        if (!deleteProfile) {
          console.log('Delete attempt Failed');
        } else {
          console.log('Profile deleted');
          return deleteProfile;
        }
      }
    }
  }
};
