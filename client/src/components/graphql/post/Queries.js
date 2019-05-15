import gql from 'graphql-tag';

export const SEARCH_DAILY_POSTS = gql`
	query SearchDailyPosts(
		$date: String!
		$search: String
		$limit: Int!
		$sort: String!
		$type: String
		$tags: [String]
	) {
		searchDailyPosts(
			date: $date
			search: $search
			limit: $limit
			sort: $sort
			type: $type
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
				user_ID
				name
				abstract
				authorName
				author_URL
				authorPicture_URL
				postOrigin_URL
				type
				createdAt
				updatedAt
				scraped
				tags
				creator {
					profile {
						name
						picture_URL
					}
				}
			}
		}
	}
`;
