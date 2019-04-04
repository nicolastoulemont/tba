import gql from 'graphql-tag';

export const GET_USER_FULL_PROFILE = gql`
	query User($id: ID!) {
		user(id: $id) {
			id
			profile {
				id
				organisation_ID
				name
				position
				bio
				twitter_URL
				linkedin_URL
				picture_URL
				tags
			}
		}
	}
`;
