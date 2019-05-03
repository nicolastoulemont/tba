import gql from 'graphql-tag';

export const LOGIN_USER = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			statusCode
			ok
			token
			errors {
				path
				message
			}
		}
	}
`;

export const REGISTER_AND_LOGIN_USER = gql`
	mutation RegisterAndLogin($email: String!, $password: String!) {
		registerAndLogin(email: $email, password: $password) {
			statusCode
			ok
			token
			errors {
				path
				message
			}
		}
	}
`;

export const CHANGE_USER_EMAIL = gql`
	mutation ChangeEmail($user_ID: ID!, $email: String!, $password: String!) {
		changeEmail(user_ID: $user_ID, email: $email, password: $password) {
			statusCode
			ok
			errors {
				path
				message
			}
			body {
				id
			}
		}
	}
`;

export const CHANGE_USER_PASSWORD = gql`
	mutation ChangePassword($user_ID: ID!, $currentPassword: String!, $newPassword: String!) {
		changePassword(
			user_ID: $user_ID
			currentPassword: $currentPassword
			newPassword: $newPassword
		) {
			statusCode
			ok
			errors {
				path
				message
			}
			body {
				id
			}
		}
	}
`;
