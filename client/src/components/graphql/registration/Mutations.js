import gql from 'graphql-tag';

export const ADD_REGISTRATION = gql`
	mutation AddRegistration(
		$user_ID: String!
		$event_ID: String!
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
			success
			errors {
				path
				message
			}
			registration {
				id
			}
		}
	}
`;

export const DELETE_REGISTRATION = gql`
	mutation DeleteRegistration($_id: ID!) {
		deleteRegistration(_id: $_id) {
			id
		}
	}
`;
