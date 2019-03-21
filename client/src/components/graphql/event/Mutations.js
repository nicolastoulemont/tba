import gql from 'graphql-tag';

export const CREATE_EVENT = gql`
	mutation AddEvent(
		$user_ID: String!
		$name: String!
		$description: String!
		$isPublic: Boolean!
		$categoryOne: String!
		$categoryTwo: String
		$categoryThree: String
		$location: String!
		$start: String
		$end: String
	) {
		addEvent(
			user_ID: $user_ID
			name: $name
			description: $description
			isPublic: $isPublic
			categoryOne: $categoryOne
			categoryTwo: $categoryTwo
			categoryThree: $categoryThree
			location: $location
			start: $start
			end: $end
		) {
			success
			event {
				id
				user_ID
				name
				description
				isPublic
				categoryOne
				categoryTwo
				categoryThree
				location
				start
				end
			}
			errors {
				path
				message
			}
		}
	}
`;

export const UPDATE_EVENT = gql`
	mutation UpdateEvent(
		$_id: ID!
		$name: String!
		$description: String!
		$isPublic: Boolean!
		$categoryOne: String!
		$categoryTwo: String
		$categoryThree: String
		$location: String!
		$start: String
		$end: String
	) {
		updateEvent(
			_id: $_id
			name: $name
			description: $description
			isPublic: $isPublic
			categoryOne: $categoryOne
			categoryTwo: $categoryTwo
			categoryThree: $categoryThree
			location: $location
			start: $start
			end: $end
		) {
			success
			event {
				id
				name
				description
				isPublic
				categoryOne
				categoryTwo
				categoryThree
				location
				start
				end
			}
			errors {
				path
				message
			}
		}
	}
`;

export const DELETE_EVENT = gql`
	mutation DeleteEvent($_id: ID!, $user_ID: String!) {
		deleteEvent(_id: $_id, user_ID: $user_ID) {
			success
			errors {
				path
				message
			}
		}
	}
`;
