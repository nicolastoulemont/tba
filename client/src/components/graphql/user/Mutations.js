import gql from 'graphql-tag';

export const LOGIN_USER = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			statusCode
			ok
			accessToken
			refreshToken
			errors {
				path
				message
			}
			body {
				id
				email
			}
		}
	}
`;

export const VERIFY_EMAIL = gql`
	mutation VerifyEmail($_id: ID!) {
		verifyEmail(_id: $_id) {
			statusCode
			ok
			errors {
				path
				message
			}
		}
	}
`;

export const SEND_VERIFY_EMAIL = gql`
	mutation SendVerifyEmail($_id: ID!, $email: String!) {
		sendVerifyEmail(_id: $_id, email: $email) {
			statusCode
			ok
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

export const REGISTER_USER = gql`
	mutation Register($email: String!, $password: String!) {
		register(email: $email, password: $password) {
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

export const DELETE_USER_ACCOUNT = gql`
	mutation DeleteAccount($user_ID: ID!, $email: String!, $password: String!) {
		deleteAccount(user_ID: $user_ID, email: $email, password: $password) {
			statusCode
			ok
			errors {
				path
				message
			}
		}
	}
`;
