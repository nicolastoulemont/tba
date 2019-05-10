import gql from 'graphql-tag';

export const CREATE_EVENT = gql`
	mutation AddEvent(
		$user_ID: String!
		$name: String!
		$abstract: String!
		$eventHost: String!
		$banner_URL: String
		$description: String!
		$isPublic: Boolean!
		$showComments: Boolean!
		$type: String
		$price: Float!
		$city: String!
		$address: String!
		$start: String!
		$end: String!
		$tags: [String]
	) {
		addEvent(
			user_ID: $user_ID
			name: $name
			abstract: $abstract
			eventHost: $eventHost
			banner_URL: $banner_URL
			description: $description
			isPublic: $isPublic
			showComments: $showComments
			type: $type
			price: $price
			city: $city
			address: $address
			start: $start
			end: $end
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
			}
		}
	}
`;

export const UPDATE_EVENT = gql`
	mutation UpdateEvent(
		$_id: ID!
		$name: String!
		$abstract: String!
		$eventHost: String!
		$banner_URL: String
		$description: String!
		$isPublic: Boolean!
		$showComments: Boolean!
		$type: String
		$price: Float!
		$city: String!
		$address: String!
		$start: String!
		$end: String!
		$tags: [String]
	) {
		updateEvent(
			_id: $_id
			name: $name
			abstract: $abstract
			eventHost: $eventHost
			banner_URL: $banner_URL
			description: $description
			isPublic: $isPublic
			showComments: $showComments
			type: $type
			price: $price
			city: $city
			address: $address
			start: $start
			end: $end
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
			}
		}
	}
`;

export const DELETE_EVENT = gql`
	mutation DeleteEvent($_id: ID!, $user_ID: String!) {
		deleteEvent(_id: $_id, user_ID: $user_ID) {
			statusCode
			ok
			errors {
				path
				message
			}
		}
	}
`;
