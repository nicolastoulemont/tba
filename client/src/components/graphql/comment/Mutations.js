import gql from 'graphql-tag';

export const ADD_COMMENT = gql`
	mutation AddComment(
		$user_ID: String!
		$event_ID: String
		$comment_ID: String
		$poll_ID: String
		$text: String!
	) {
		addComment(
			user_ID: $user_ID
			event_ID: $event_ID
			comment_ID: $comment_ID
			poll_ID: $poll_ID
			text: $text
		) {
			id
		}
	}
`;

export const EDIT_COMMENT = gql`
	mutation UpdateComment($_id: ID!, $text: String) {
		updateComment(_id: $_id, text: $text) {
			id
		}
	}
`;

export const MODERATE_COMMENT = gql`
	mutation ModerateComment($_id: ID!, $user_ID: String!, $event_ID: String!) {
		moderateComment(_id: $_id, user_ID: $user_ID, event_ID: $event_ID) {
			id
		}
	}
`;
