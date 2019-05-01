import gql from 'graphql-tag';

export const GET_EVENT_LIKES = gql`
	query EventLikes($event_ID: ID!) {
		eventLikes(event_ID: $event_ID) {
			statusCode
			ok
			body {
				id
				user_ID
			}
		}
	}
`;

export const GET_COMMENT_LIKES = gql`
	query CommentLikes($comment_ID: ID!) {
		commentLikes(comment_ID: $comment_ID) {
			statusCode
			ok
			body {
				id
				user_ID
			}
		}
	}
`;

export const GET_USER_LIKES = gql`
	query UserLikes($user_ID: ID!) {
		userLikes(user_ID: $user_ID) {
			statusCode
			ok
			body {
				id
				event {
					id
					name
					isPublic
				}
				comment {
					id
					user_ID
					moderated
					creator {
						profile {
							name
						}
					}
				}
			}
		}
	}
`;
