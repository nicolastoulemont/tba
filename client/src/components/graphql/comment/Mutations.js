import gql from 'graphql-tag';

export const ADD_COMMENT = gql`
	mutation AddComment($user_ID: String!, $event_ID: String, $poll_ID: String, $text: String!) {
		addComment(user_ID: $user_ID, event_ID: $event_ID, poll_ID: $poll_ID, text: $text) {
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

export const EDIT_COMMENT = gql`
	mutation UpdateComment($_id: ID!, $text: String) {
		updateComment(_id: $_id, text: $text) {
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

export const PIN_COMMENT = gql`
	mutation PinComment($_id: ID!, $user_ID: ID!, $event_ID: ID!, $pinned: Boolean!) {
		pinComment(_id: $_id, user_ID: $user_ID, event_ID: $event_ID, pinned: $pinned) {
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

export const MODERATE_COMMENT = gql`
	mutation ModerateComment($_id: ID!, $user_ID: String!, $event_ID: String!) {
		moderateComment(_id: $_id, user_ID: $user_ID, event_ID: $event_ID) {
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
