import gql from 'graphql-tag';

export const SEARCH_DAILY_EVENTS = gql`
	query SearchDailyEvents(
		$date: String!
		$search: String
		$limit: Int!
		$sort: String!
		$type: String
		$price: Float
		$tags: [String]
	) {
		searchDailyEvents(
			date: $date
			search: $search
			limit: $limit
			sort: $sort
			type: $type
			price: $price
			tags: $tags
		) {
			statusCode
			ok
			errors {
				path
				message
			}
			body {
				id
				user_ID
				name
				abstract
				isPublic
				type
				price
				start
				end
				city
				address
				createdAt
				updatedAt
				scraped
				tags
				creator {
					profile {
						name
						picture_URL
					}
				}
			}
		}
	}
`;

export const GET_MOST_LIKED_EVENTS = gql`
	query mostLikedEvents(
		$date: String!
		$limit: Int!
		$type: String
		$price: Float
		$tags: [String]
	) {
		mostLikedEvents(date: $date, limit: $limit, type: $type, price: $price, tags: $tags) {
			statusCode
			ok
			errors {
				path
				message
			}
			body {
				id
				user_ID
				name
				city
				address
				start
				end
				likesCount
			}
		}
	}
`;

export const GET_EVENTS = gql`
	{
		events(limit: 10) {
			id
			user_ID
			name
			abstract
			isPublic
			type
			price
			tags
			city
			address
			createdAt
			updatedAt
			start
			end
			creator {
				profile {
					name
					position
					organisation_ID
					picture_URL
				}
			}
		}
	}
`;

export const GET_EVENT = gql`
	query Event($id: ID!) {
		event(id: $id) {
			statusCode
			ok
			errors {
				path
				message
			}
			body {
				id
				user_ID
				isPublic
				showComments
				type
				price
				name
				abstract
				banner_URL
				description
				city
				address
				tags
				start
				end
				createdAt
				updatedAt
				creator {
					profile {
						name
						position
						organisation_ID
						picture_URL
					}
				}
			}
		}
	}
`;

export const GET_EVENT_LIKES_COUNT = gql`
	query Event($id: ID!) {
		event(id: $id) {
			statusCode
			ok
			errors {
				path
				message
			}
			body {
				id
				likesCount
			}
		}
	}
`;

export const GET_USER_FUTURE_HOSTED_EVENTS = gql`
	query UserFutureHostedEvents($user_ID: ID!, $date: String!) {
		userFutureHostedEvents(user_ID: $user_ID, date: $date) {
			statusCode
			ok
			errors {
				path
				message
			}
			body {
				id
				user_ID
				name
				city
				address
				start
				end
			}
		}
	}
`;

export const GET_USER_PAST_HOSTED_EVENTS = gql`
	query UserPastHostedEvents($user_ID: ID!, $date: String!) {
		userPastHostedEvents(user_ID: $user_ID, date: $date) {
			statusCode
			ok
			errors {
				path
				message
			}
			body {
				id
				user_ID
				name
				city
				address
				start
				end
			}
		}
	}
`;

export const GET_USER_EVENTS = gql`
	query UserEvents($user_ID: ID!) {
		userEvents(user_ID: $user_ID) {
			statusCode
			ok
			errors {
				path
				message
			}
			body {
				id
				name
				city
				address
				start
				end
			}
		}
	}
`;

export const SEARCH_USER_EVENTS = gql`
	query SearchUserEvents(
		$user_ID: ID!
		$date: String!
		$search: String
		$limit: Int!
		$sort: String!
	) {
		searchUserEvents(user_ID: $user_ID, date: $date, search: $search, limit: $limit, sort: $sort) {
			statusCode
			ok
			errors {
				path
				message
			}
			body {
				id
				name
				city
				address
				start
				end
				likesCount
				registrations {
					id
				}
				reports {
					id
				}
				comments {
					id
				}
			}
		}
	}
`;
