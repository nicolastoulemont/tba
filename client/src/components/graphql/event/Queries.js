import gql from 'graphql-tag';

export const GET_DAY_EVENTS = gql`
	query Onedayevents(
		$day: String!
		$interestOne: String!
		$interestTwo: String
		$interestThree: String
	) {
		onedayevents(
			day: $day
			interestOne: $interestOne
			interestTwo: $interestTwo
			interestThree: $interestThree
		) {
			id
			user_ID
			name
			abstract
			isPublic
			categoryOne
			categoryTwo
			categoryThree
			location
			start
			end
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
`;

export const GET_EVENTS = gql`
	{
		events(first: 10) {
			id
			user_ID
			name
			abstract
			isPublic
			location
			start
			end
			categoryOne
			categoryTwo
			categoryThree
		}
	}
`;

export const GET_EVENT = gql`
	query Event($id: ID!) {
		event(id: $id) {
			id
			user_ID
			isPublic
			name
			description
			location
			categoryOne
			categoryTwo
			categoryThree
			start
			end
			createdAt
			updatedAt
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
`;
