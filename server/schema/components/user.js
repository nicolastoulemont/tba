// Password utils
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../../config/keys');
// Utilitary
const { gql } = require('apollo-server-express');
const gravatar = require('gravatar');
// Models
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const EventItem = require('../../models/Eventitem');
const Registration = require('../../models/Registration');
const CommentItem = require('../../models/Comment');
const Poll = require('../../models/Poll');
const Like = require('../../models/Like');
// Validation
const validateRegInput = require('../../validation/user');

module.exports = {
  UserType: gql`
    type User {
      id: ID!
      email: String!
      avatar: String
      createdAt: String
      updatedAt: String
      events: [EventItem]
      registrations: [Registration]
      profile: Profile
      comments: [CommentItem]
      polls: [Poll]
      likes: [Like]
    }

    type RegisterResp {
      success: Boolean!
      user: User
      errors: [Error]
    }

    type LoginResp {
      success: Boolean!
      token: String
      error: String
    }

    extend type Query {
      user(id: ID!): User
      currentuser: User
      users: [User!]!
    }

    extend type Mutation {
      register(email: String!, password: String!): RegisterResp!
      login(email: String!, password: String!): LoginResp!
      updateUser(_id: ID!, email: String): User
      deleteUser(_id: ID!): User
    }
  `,
  // Resolvers
  UserRes: {
    Query: {
      user: (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        return User.findById(args.id);
      },
      currentuser: (parent, args, { user }) => {
        if (!user) throw new Error('Error : You are not logged in');
        const logUser = user.user;
        return User.findOne({ _id: logUser.id });
      },
      users: (parent, args, { user }) => {
        // if (!user) throw new Error('Error : You are not logged in');
        return User.find({});
      }
    },

    User: {
      events: (parent, args) => {
        return EventItem.find({ userId: parent.id });
      },
      registrations: (parent, args) => {
        return Registration.find({ userId: parent.id });
      },
      profile: (parent, args) => {
        return Profile.findOne({ userId: parent.id });
      },
      comments: (parent, args) => {
        return CommentItem.find({ userId: parent.id });
      },
      polls: (parent, args) => {
        return Poll.find({ userId: parent.id });
      },
      likes: (parent, args) => {
        return Like.find({ userId: parent.id });
      }
    },

    Mutation: {
      register: async (parent, args) => {
        const { errors, isValid } = await validateRegInput(args);
        if (!isValid) return { success: false, errors };
        const { password } = args;

        const avatar = gravatar.url(args.email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        });

        const hashedPwd = await bcrypt.hash(password, 12);
        let newUser = new User({
          email: args.email,
          avatar,
          password: hashedPwd
        });
        const user = await newUser.save();
        return { success: true, user };
      },
      login: async (parent, args, context) => {
        const user = await User.findOne({ email: args.email });
        if (!user) return { success: false, error: 'Invalid Email' };
        const valid = await bcrypt.compare(args.password, user.password);
        if (!valid) return { success: false, error: 'Invalid Password' };

        const token = jwt.sign(
          {
            user: {
              id: user._id
            }
          },
          SECRET,
          { expiresIn: '1y' }
        );
        return { success: true, token };
      },
      updateUser: (parent, args) => {
        let updateUser = {};

        if (args.email) updateUser.email = args.email;

        const updUser = User.findByIdAndUpdate(args._id, updateUser, {
          new: true
        });
        if (!updUser) console.log('Update failed');
        // Save to db
        return updUser;
      },
      deleteUser: (parent, args) => {
        const deleteUser = User.findByIdAndDelete(args._id);

        if (!deleteUser) {
          console.log('Delete attempt Failed');
        } else {
          console.log('User deleted');
          return deleteUser;
        }
      }
    }
  }
};
