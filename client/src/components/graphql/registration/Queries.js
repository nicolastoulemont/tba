import gql from 'graphql-tag';

export const GET_EVENT_REGISTRATIONS = gql`
	query Event($id: ID!) {
		event(id: $id) {
			id
			registrations {
				id
				user_ID
				creator {
					profile {
						name
						position
						organisation_ID
						picture_URL
					}
				}
			}
		}
	}
`;

export const GET_EVENT_REGISTRATIONS_IDS = gql`
	query Event($id: ID!) {
		event(id: $id) {
			id
			registrations {
				id
				user_ID
			}
		}
	}
`;
