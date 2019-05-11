import gql from 'graphql-tag';

export const ADD_REPORT = gql`
	mutation AddReport(
		$user_ID: String!
		$event_ID: String
		$poll_ID: String
		$comment_ID: String
		$text: String!
	) {
		addReport(
			user_ID: $user_ID
			event_ID: $event_ID
			poll_ID: $poll_ID
			comment_ID: $comment_ID
			text: $text
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
