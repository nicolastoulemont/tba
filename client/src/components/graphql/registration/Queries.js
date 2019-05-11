import gql from 'graphql-tag';

export const GET_EVENT_REGISTRATIONS = gql`
	query EventRegistrations($event_ID: ID!) {
		eventRegistrations(event_ID: $event_ID) {
			statusCode
			ok
			errors {
				path
				message
			}
			body {
				id
				user_ID
				creator {
					profile {
						name
						position
						organisation
						picture_URL
					}
				}
			}
		}
	}
`;

export const GET_EVENT_REGISTRATIONS_IDS = gql`
	query EventRegistrations($event_ID: ID!) {
		eventRegistrations(event_ID: $event_ID) {
			statusCode
			ok
			errors {
				path
				message
			}
			body {
				id
				user_ID
			}
		}
	}
`;

export const GET_USER_FUTURE_REGISTRATIONS = gql`
	query UserFutureRegistrations($user_ID: ID!, $date: String!) {
		userFutureRegistrations(user_ID: $user_ID, date: $date) {
			statusCode
			ok
			errors {
				path
				message
			}
			body {
				id
				user_ID
				event_ID
				eventName
				eventCity
				eventAddress
				eventStart
				eventEnd
			}
		}
	}
`;

export const GET_USER_PAST_REGISTRATIONS = gql`
	query UserPastRegistrations($user_ID: ID!, $date: String!) {
		userPastRegistrations(user_ID: $user_ID, date: $date) {
			statusCode
			ok
			errors {
				path
				message
			}
			body {
				id
				user_ID
				event_ID
				eventName
				eventCity
				eventAddress
				eventStart
				eventEnd
			}
		}
	}
`;

export const SEARCH_USER_REGISTRATIONS = gql`
	query SearchUserRegistrations(
		$user_ID: ID!
		$date: String!
		$search: String
		$limit: Int!
		$sort: String!
	) {
		searchUserRegistrations(
			user_ID: $user_ID
			date: $date
			search: $search
			limit: $limit
			sort: $sort
		) {
			statusCode
			ok
			errors {
				path
				message
			}
			body {
				id
				event_ID
				eventName
				eventCity
				eventAddress
				eventStart
				eventEnd
			}
		}
	}
`;
