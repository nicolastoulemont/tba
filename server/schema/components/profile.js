const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { gql } = require('apollo-server-express');

module.exports = {
  ProfileType: gql`
    type Profile {
      id: ID!
      userId: ID!
      name: String!
      organisation: String
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
    }

    type ProfileResp {
      success: Boolean!
      profile: Profile
      error: String
    }

    extend type Query {
      profile(id: ID!): Profile
      searchProfilesByName(search: String, limit: Int): [Profile!]!
      profiles: [Profile!]!
    }

    extend type Mutation {
      addProfile(
        userId: String!
        name: String!
        organisation: String
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
        position: String
        interestOne: String!
        interestTwo: String
        interestThree: String
        bio: String
        twitter: String
        linkedin: String
      ): ProfileResp
      deleteProfile(_id: ID!, userId: String!): ProfileResp
    }
  `,
  // Resolvers
  ProfileRes: {
    Query: {
      profile: async (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        try {
          return await Profile.findById(args.id);
        } catch (err) {
          throw new Error('Bad request');
        }
      },
      searchProfilesByName: async (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        try {
          return await Profile.find({
            name: { $regex: new RegExp(args.search) }
          })
            .limit(args.limit)
            .sort({ name: 1 });
        } catch (err) {
          throw new Error('Bad request');
        }
      },
      profiles: async (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        try {
          return await Profile.find({});
        } catch (err) {
          throw new Error('Bad request');
        }
      }
    },

    Profile: {
      creator: (parent, args) => {
        return User.findOne({ _id: parent.userId });
      }
    },

    Mutation: {
      addProfile: async (parent, args, { user }) => {
        if (!user)
          return {
            success: false,
            error: 'You are not logged in'
          };
        // TODO : Add input validation function
        try {
          let newProfile = new Profile({
            userId: args.userId,
            name: args.name,
            organisation: args.organisation,
            position: args.position,
            interestOne: args.interestOne,
            interestTwo: args.interestTwo,
            interestThree: args.interestThree,
            bio: args.bio,
            twitter: args.twitter,
            linkedin: args.linkedin
          }).save();
          return { success: true, newProfile };
        } catch (err) {
          console.log(err);
          return { success: false, error };
        }
      },
      updateProfile: async (parent, args, { user }) => {
        if (!user)
          return {
            success: false,
            error: 'You are not logged in'
          };
        // TODO : Add input validation function
        try {
          let updateProfile = {};
          if (args.name) updateProfile.name = args.name;
          if (args.organisation) updateProfile.organisation = args.organisation;
          if (args.position) updateProfile.position = args.position;
          if (args.interestOne) updateProfile.interestOne = args.interestOne;
          if (args.interestTwo) updateProfile.interestTwo = args.interestTwo;
          if (args.interestThree)
            updateProfile.interestThree = args.interestThree;
          if (args.bio) updateProfile.bio = args.bio;
          if (args.twitter) updateProfile.twitter = args.twitter;
          if (args.linkedin) updateProfile.linkedin = args.linkedin;

          return {
            success: true,
            profile: await Profile.findByIdAndUpdate(args._id, updateProfile, {
              new: true
            })
          };
        } catch (err) {
          console.log(err);
          return { success: false, error };
        }
      },
      deleteProfile: async (parent, args, { user }) => {
        if (!user)
          return {
            success: false,
            error: 'You are not logged in'
          };
        try {
          return {
            success: true,
            deleteProfile: await Profile.findByIdAndDelete(args._id)
          };
        } catch (err) {
          console.log(err);
          return { success: false, error };
        }
      }
    }
  }
};
