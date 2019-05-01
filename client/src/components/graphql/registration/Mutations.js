import gql from 'graphql-tag';

export const ADD_REGISTRATION = gql`
	mutation AddRegistration(
		$user_ID: ID!
		$event_ID: ID!
		$eventName: String!
		$eventCity: String
		$eventAddress: String
		$eventStart: String!
		$eventEnd: String!
	) {
		addRegistration(
			user_ID: $user_ID
			event_ID: $event_ID
			eventName: $eventName
			eventCity: $eventCity
			eventAddress: $eventAddress
			eventStart: $eventStart
			eventEnd: $eventEnd
		) {
			statusCode
			ok
			errors {
				path
				message
			}
			body {
				id
			}
		}
	}
`;

export const DELETE_REGISTRATION = gql`
	mutation DeleteRegistration($_id: ID!) {
		deleteRegistration(_id: $_id) {
			statusCode
			ok
			errors {
				path
				message
			}
		}
	}
`;
