import gql from 'graphql-tag';

export const ADD_LIKE = gql`
	mutation AddLike($user_ID: String!, $event_ID: String, $poll_ID: String, $comment_ID: String) {
		addLike(user_ID: $user_ID, event_ID: $event_ID, poll_ID: $poll_ID, comment_ID: $comment_ID) {
			success
			errors {
				path
				message
			}
			like {
				id
			}
		}
	}
`;

export const DELETE_LIKE = gql`
	mutation DeleteLike($_id: ID!, $user_ID: String!) {
		deleteLike(_id: $_id, user_ID: $user_ID) {
			id
		}
	}
`;
