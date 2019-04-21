import gql from 'graphql-tag';

export const GET_EVENT_COMMENTS = gql`
	query EventComments($event_ID: ID!) {
		eventComments(event_ID: $event_ID) {
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
`;

export const GET_COMMENT_COMMENTS = gql`
	query Comment($id: ID!) {
		comment(id: $id) {
			comments {
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
