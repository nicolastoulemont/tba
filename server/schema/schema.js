const { rootQuery } = require('./root');
const { ErrorType, StartType } = require('./errors');
const { DateType, DateRes } = require('./date');
const { UserType, UserRes } = require('./components/user');
const {
  OrganisationType,
  OrganisationRes
} = require('./components/organisation');
const { MembershipType, MembershipRes } = require('./components/membership');
const { EventType, EventRes } = require('./components/event');
const { ProfileType, ProfileRes } = require('./components/profile');
const { CommentType, CommentRes } = require('./components/comment');
const { PollType, PollRes } = require('./components/poll');
const { LikeType, LikeRes } = require('./components/like');
const { ReportType, ReportRes } = require('./components/report');
const {
  RegistrationType,
  RegistrationRes
} = require('./components/registration');
const { makeExecutableSchema } = require('graphql-tools');

const resolvers = {};

module.exports = schema = makeExecutableSchema({
  typeDefs: [
    rootQuery,
    ErrorType,
    StartType,
    DateType,
    UserType,
    OrganisationType,
    EventType,
    ProfileType,
    CommentType,
    PollType,
    LikeType,
    ReportType,
    RegistrationType,
    MembershipType
  ],
  resolvers: [
    DateRes,
    UserRes,
    OrganisationRes,
    EventRes,
    ProfileRes,
    CommentRes,
    PollRes,
    LikeRes,
    ReportRes,
    RegistrationRes,
    MembershipRes
  ]
});
