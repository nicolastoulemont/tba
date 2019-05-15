const { rootQuery } = require('./general/root');
const { ResponseType } = require('./general/response');
const { DateType, DateRes } = require('./general/date');
const { s3Type, s3Res } = require('./general/s3');
const { UserType, UserRes } = require('./components/user');
const { OrganisationType, OrganisationRes } = require('./components/organisation');
const { MembershipType, MembershipRes } = require('./components/membership');
const { EventType, EventRes } = require('./components/event');
const { PostType, PostRes } = require('./components/post');
const { ProfileType, ProfileRes } = require('./components/profile');
const { CommentType, CommentRes } = require('./components/comment');
const { PollType, PollRes } = require('./components/poll');
const { LikeType, LikeRes } = require('./components/like');
const { ReportType, ReportRes } = require('./components/report');
const { RegistrationType, RegistrationRes } = require('./components/registration');

const { UserLogType, UserLogRes } = require('./components/userLog');

const { makeExecutableSchema } = require('graphql-tools');

const resolvers = {};

module.exports = schema = makeExecutableSchema({
	typeDefs: [
		rootQuery,
		ResponseType,
		DateType,
		s3Type,
		UserType,
		OrganisationType,
		EventType,
		PostType,
		ProfileType,
		CommentType,
		PollType,
		LikeType,
		ReportType,
		RegistrationType,
		MembershipType,
		UserLogType
	],
	resolvers: [
		DateRes,
		s3Res,
		UserRes,
		OrganisationRes,
		EventRes,
		PostRes,
		ProfileRes,
		CommentRes,
		PollRes,
		LikeRes,
		ReportRes,
		RegistrationRes,
		MembershipRes,
		UserLogRes
	],
	resolverValidationOptions: {
		requireResolversForResolveType: false
	}
});
