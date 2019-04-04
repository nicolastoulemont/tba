import gql from 'graphql-tag';

export const GET_EVENT_REGISTRATIONS = gql`
	query Event($id: ID!) {
		event(id: $id) {
			id
			registrations {
				id
				user_ID
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

export const GET_EVENT_REGISTRATIONS_IDS = gql`
	query Event($id: ID!) {
		event(id: $id) {
			id
			registrations {
				id
				user_ID
			}
		}
	}
`;

export const GET_USER_FUTURE_REGISTRATIONS = gql`
	query UserFutureRegistrations($user_ID: ID!, $date: String!) {
		userFutureRegistrations(user_ID: $user_ID, date: $date) {
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
`;

export const GET_USER_PAST_REGISTRATIONS = gql`
	query UserPastRegistrations($user_ID: ID!, $date: String!) {
		userPastRegistrations(user_ID: $user_ID, date: $date) {
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
`;
