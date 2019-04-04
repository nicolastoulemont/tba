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
			createdAt
			updatedAt
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
			categoryOne
			categoryTwo
			categoryThree
			location
			createdAt
			updatedAt
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

export const GET_EVENT = gql`
	query Event($id: ID!) {
		event(id: $id) {
			id
			user_ID
			isPublic
			name
			abstract
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

export const GET_USER_FUTURE_HOSTED_EVENTS = gql`
	query UserFutureHostedEvents($user_ID: ID!, $date: String!) {
		userFutureHostedEvents(user_ID: $user_ID, date: $date) {
			id
			user_ID
			name
			location
			start
			end
		}
	}
`;

export const GET_USER_PAST_HOSTED_EVENTS = gql`
	query UserPastHostedEvents($user_ID: ID!, $date: String!) {
		userPastHostedEvents(user_ID: $user_ID, date: $date) {
			id
			user_ID
			name
			location
			start
			end
		}
	}
`;
