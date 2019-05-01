import gql from 'graphql-tag';

export const GET_EVENT_COMMENTS = gql`
	query EventComments($event_ID: ID!) {
		eventComments(event_ID: $event_ID) {
			statusCode
			ok
			errors {
				path
				message
			}
			body {
				id
				user_ID
				text
				moderated
				moderationMsg
				createdAt
				updatedAt
				creator {
					profile {
						id
						name
						picture_URL
					}
				}
			}
		}
	}
`;

export const GET_COMMENT_COMMENTS = gql`
	query CommentComments($comment_ID: ID!) {
		commentComments(comment_ID: $comment_ID) {
			statusCode
			ok
			errors {
				path
				message
			}
			body {
				id
				user_ID
				text
				moderated
				moderationMsg
				createdAt
				updatedAt
				creator {
					profile {
						name
						picture_URL
					}
				}
			}
		}
	}
`;

export const GET_USER_COMMENTS = gql`
	query UserComments($user_ID: ID!) {
		userComments(user_ID: $user_ID) {
			statusCode
			ok
			errors {
				path
				message
			}
			body {
				id
				text
				moderated
				event {
					id
					name
				}
				comment {
					user_ID
					text
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
