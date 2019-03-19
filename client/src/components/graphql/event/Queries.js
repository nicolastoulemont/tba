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
			userId
			name
			ispublic
			categoryOne
			categoryTwo
			categoryThree
			location
			start
			end
			creator {
				avatar
				profile {
					name
					position
					organisation
				}
			}
		}
	}
`;

export const GET_EVENTS = gql`
	{
		events {
			id
			userId
			name
			ispublic
			categoryOne
			categoryTwo
			categoryThree
			location
			start
			end
		}
	}
`;

export const GET_EVENT = gql`
	query Event($id: ID!) {
		event(id: $id) {
			id
			userId
			ispublic
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
				avatar
				profile {
					name
					position
					organisation
				}
			}
		}
	}
`;
