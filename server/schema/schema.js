const { rootQuery } = require('./root');
const { ErrorType, StartType } = require('./errors');
const { DateType, DateRes } = require('./date');
const { UserType, UserRes } = require('./components/user');
const { EventType, EventRes } = require('./components/event');
const { ProfileType, ProfileRes } = require('./components/profile');
const { CommentType, CommentRes } = require('./components/comment');
const { PollType, PollRes } = require('./components/poll');
const { LikeType, LikeRes } = require('./components/like');
const { makeExecutableSchema } = require('graphql-tools');

const resolvers = {};

module.exports = schema = makeExecutableSchema({
  typeDefs: [
    rootQuery,
    ErrorType,
    StartType,
    DateType,
    UserType,
    EventType,
    ProfileType,
    CommentType,
    PollType,
    LikeType
  ],
  resolvers: [
    DateRes,
    UserRes,
    EventRes,
    ProfileRes,
    CommentRes,
    PollRes,
    LikeRes
  ]
});
