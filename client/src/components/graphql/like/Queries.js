import gql from 'graphql-tag';

export const GET_EVENT_LIKES = gql`
	query EventLikes($event_ID: ID!) {
		eventLikes(event_ID: $event_ID) {
			id
			user_ID
		}
	}
`;

export const GET_COMMENT_LIKES = gql`
	query CommentLikes($comment_ID: ID!) {
		commentLikes(comment_ID: $comment_ID) {
			id
			user_ID
		}
	}
`;
