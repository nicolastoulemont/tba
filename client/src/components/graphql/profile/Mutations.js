import gql from 'graphql-tag';

export const CREATE_PROFILE = gql`
	mutation AddProfile(
		$user_ID: String!
		$organisation_ID: String
		$name: String!
		$position: String!
		$bio: String
		$twitter_URL: String
		$linkedin_URL: String
		$picture_URL: String
		$interestOne: String!
		$interestTwo: String
		$interestThree: String
	) {
		addProfile(
			user_ID: $user_ID
			organisation_ID: $organisation_ID
			name: $name
			position: $position
			bio: $bio
			twitter_URL: $twitter_URL
			linkedin_URL: $linkedin_URL
			picture_URL: $picture_URL
			interestOne: $interestOne
			interestTwo: $interestTwo
			interestThree: $interestThree
		) {
			profile {
				id
				user_ID
				organisation_ID
				name
				position
				bio
				twitter_URL
				linkedin_URL
				picture_URL
				interestOne
				interestTwo
				interestThree
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
		$bio: String
		$twitter_URL: String
		$linkedin_URL: String
		$picture_URL: String
		$interestOne: String!
		$interestTwo: String
		$interestThree: String
	) {
		updateProfile(
			_id: $_id
			organisation_ID: $organisation_ID
			name: $name
			position: $position
			bio: $bio
			twitter_URL: $twitter_URL
			linkedin_URL: $linkedin_URL
			picture_URL: $picture_URL
			interestOne: $interestOne
			interestTwo: $interestTwo
			interestThree: $interestThree
		) {
			success
			profile {
				id
				organisation_ID
				name
				position
				bio
				twitter_URL
				linkedin_URL
				picture_URL
				interestOne
				interestTwo
				interestThree
			}
			error
		}
	}
`;
