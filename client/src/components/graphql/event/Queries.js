import gql from 'graphql-tag';

export const SEARCH_DAILY_EVENTS = gql`
	query SearchDailyEvents($date: String!, $search: String, $limit: Int!, $sort: String!) {
		searchDailyEvents(date: $date, search: $search, limit: $limit, sort: $sort) {
			id
			user_ID
			name
			abstract
			isPublic
			start
			end
			city
			address
			createdAt
			updatedAt
			tags
			creator {
				profile {
					name
					picture_URL
				}
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
			id
			user_ID
			isPublic
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
`;

export const GET_USER_FUTURE_HOSTED_EVENTS = gql`
	query UserFutureHostedEvents($user_ID: ID!, $date: String!) {
		userFutureHostedEvents(user_ID: $user_ID, date: $date) {
			id
			user_ID
			name
			city
			address
			start
			end
		}
	}
`;

export const GET_USER_PAST_HOSTED_EVENTS = gql`
	query UserPastHostedEvents($user_ID: ID!, $date: String!) {
		userPastHostedEvents(user_ID: $user_ID, date: $date) {
			id
			user_ID
			name
			city
			address
			start
			end
		}
	}
`;
