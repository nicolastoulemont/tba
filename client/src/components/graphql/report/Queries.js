import gql from 'graphql-tag';

export const EVENT_REPORTS = gql`
	query FindEventCommentsReports($event_ID: ID!) {
		findEventCommentsReports(event_ID: $event_ID) {
			statusCode
			ok
			errors {
				path
				message
			}
			body {
				id
				text
				user_ID
				creator {
					profile {
						name
					}
				}
				comment {
					id
					user_ID
					text
					creator {
						profile {
							name
						}
					}
				}
			}
		}
	}
`;
