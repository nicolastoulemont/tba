const { gql, AuthenticationError } = require('apollo-server');

module.exports = {
	PollType: gql`
		type Poll {
			id: ID!
			user_ID: ID!
			event_ID: String!
			text: String!
			createdAt: Date
			updatedAt: Date
			event: EventItem
			comments: [CommentItem]
			likes: [Like]
			reports: [Report]
			creator: User
		}

		extend type Query {
			poll(id: ID!): Poll
			polls: [Poll!]!
		}

		extend type Mutation {
			addPoll(user_ID: String!, event_ID: String!, text: String!): Poll
			updatePoll(_id: ID!, text: String): Poll
			deletePoll(_id: ID!): Poll
		}
	`,
	// Resolvers
	PollRes: {
		Query: {
			poll: async (parent, args, { user, models: { Poll } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				try {
					return await Poll.findById(args.id);
				} catch (err) {
					throw new Error('Bad request');
				}
			},
			polls: async (parent, args, { user, models: { Poll } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				try {
					return await Poll.find({});
				} catch (err) {
					throw new Error('Bad request');
				}
			}
		},

		Poll: {
			creator: async (parent, args, { models: { User } }) =>
				await User.findOne({ _id: parent.user_ID }),
			event: async (parent, args, { models: { EventItem } }) =>
				await EventItem.findOne({ _id: parent.event_ID }),
			comments: async (parent, args, { models: { CommentItem } }) =>
				await CommentItem.find({ poll_ID: parent.id }),
			likes: async (parent, args, { models: Like }) => await Like.find({ poll_ID: parent.id }),
			reports: async (parent, args, { models: Report }) => await Report.find({ poll_ID: parent.id })
		},

		Mutation: {
			addPoll: async (parent, args, { user, models: { Poll } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				try {
					return await new Poll({
						user_ID: args.user_ID,
						event_ID: args.event_ID,
						text: args.text
					}).save();
				} catch (err) {
					console.log(err);
				}
			},
			updatePoll: async (parent, args, { user, models: { Poll } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				let updatePoll = {};
				if (args.text) updatePoll.text = args.text;
				try {
					return await Poll.findByIdAndUpdate(args._id, updatePoll, {
						new: true
					});
				} catch (err) {
					console.log(err);
				}
			},
			deletePoll: async (parent, args, { user, models: { Poll } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				try {
					return await Poll.findByIdAndDelete(args._id);
				} catch (err) {
					console.log(err);
				}
			}
		}
	}
};
