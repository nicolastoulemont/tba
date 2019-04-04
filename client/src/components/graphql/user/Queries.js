import gql from 'graphql-tag';

export const LOGGED_USER = gql`
	{
		currentUser {
			id
			profile {
				name
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
				location
				start
				end
			}
		}
	}
`;

export const GET_USER_REGISTRATIONS = gql`
	query User($id: ID!) {
		user(id: $id) {
			id
			registrations {
				id
				event {
					id
					name
					location
					start
					end
				}
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
				event {
					id
					name
				}
				comment {
					user_ID
					text
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
