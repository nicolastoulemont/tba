import gql from 'graphql-tag';

export const CREATE_PROFILE = gql`
	mutation AddProfile(
		$user_ID: String!
		$organisation_ID: String
		$name: String!
		$position: String!
		$hideSocial: Boolean
		$privateProfile: Boolean
		$bio: String
		$twitter_URL: String
		$linkedin_URL: String
		$picture_URL: String
		$tags: [String]
	) {
		addProfile(
			user_ID: $user_ID
			organisation_ID: $organisation_ID
			name: $name
			position: $position
			hideSocial: $hideSocial
			privateProfile: $privateProfile
			bio: $bio
			twitter_URL: $twitter_URL
			linkedin_URL: $linkedin_URL
			picture_URL: $picture_URL
			tags: $tags
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

export const UPDATE_PROFILE = gql`
	mutation UpdateProfile(
		$_id: ID!
		$organisation_ID: String
		$name: String
		$position: String
		$hideSocial: Boolean
		$privateProfile: Boolean
		$bio: String
		$twitter_URL: String
		$linkedin_URL: String
		$picture_URL: String
		$tags: [String]
	) {
		updateProfile(
			_id: $_id
			organisation_ID: $organisation_ID
			name: $name
			position: $position
			hideSocial: $hideSocial
			privateProfile: $privateProfile
			bio: $bio
			twitter_URL: $twitter_URL
			linkedin_URL: $linkedin_URL
			picture_URL: $picture_URL
			tags: $tags
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
