import gql from 'graphql-tag';

export const REGISTER_USER = gql`
	mutation Register($email: String!, $password: String!) {
		register(email: $email, password: $password) {
			success
			user {
				id
				email
			}
			errors {
				path
				message
			}
		}
	}
`;

export const LOGIN_USER = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			success
			token
			error
		}
	}
`;
