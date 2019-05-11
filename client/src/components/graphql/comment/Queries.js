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
				pinned
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
			}
		}
	}
`;
