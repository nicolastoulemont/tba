import gql from 'graphql-tag';

export const GET_USER_FULL_PROFILE = gql`
	query User($id: ID!) {
		user(id: $id) {
			id
			profile {
				id
				user_ID
				organisation_ID
				name
				position
				bio
				hideSocial
				privateProfile
				twitter_URL
				linkedin_URL
				picture_URL
				tags
			}
		}
	}
`;
