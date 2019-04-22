import gql from 'graphql-tag';

export const LOGGED_USER = gql`
	{
		currentUser {
			id
			profile {
				id
				organisation_ID
				name
				position
				hideSocial
				privateProfile
				bio
				twitter_URL
				linkedin_URL
				picture_URL
				tags
			}
		}
	}
`;

export const LOGGED_USER_ID = gql`
	{
		currentUser {
			id
		}
	}
`;

export const GET_USER_EVENTS = gql`
	query User($id: ID!) {
		user(id: $id) {
			id
			events {
				id
				name
				city
				address
				start
				end
			}
		}
	}
`;

export const GET_USER_COMMENTS = gql`
	query User($id: ID!) {
		user(id: $id) {
			id
			comments {
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

export const GET_USER_LIKES = gql`
	query User($id: ID!) {
		user(id: $id) {
			id
			likes {
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
