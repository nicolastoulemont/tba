import gql from 'graphql-tag';

export const GET_USER_FULL_PROFILE = gql`
	query SearchUserProfile($user_ID: ID!) {
		searchUserProfile(user_ID: $user_ID) {
			statusCode
			ok
			errors {
				path
				message
			}
			body {
				id
				user_ID
				name
				position
				organisation
				bio
				hideSocial
				privateProfile
				twitter_URL
				linkedin_URL
				website_URL
				picture_URL
				tags
			}
		}
	}
`;
