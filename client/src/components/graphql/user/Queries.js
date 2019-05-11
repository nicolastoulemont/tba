import gql from 'graphql-tag';

export const LOGGED_USER = gql`
	{
		currentUser {
			id
			email
			profile {
				id
				name
				position
				organisation
				hideSocial
				privateProfile
				bio
				twitter_URL
				linkedin_URL
				website_URL
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
