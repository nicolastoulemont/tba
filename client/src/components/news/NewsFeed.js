import React, { Fragment } from 'react';
import CQuery from '../commons/CustomQueryComponent';
import NewsFeedItem from './NewsFeedItem';

import { GET_EVENTS } from '../graphql/event/Queries';

const NewsFeed = ({ user }) => {
	return (
		<Fragment>
			<CQuery query={GET_EVENTS}>
				{({ data }) => {
					return (
						<Fragment>
							{data.events.map(event => (
								<NewsFeedItem
									key={event.id}
									currentUser={user}
									user_ID={event.user_ID}
									event_ID={event.id}
									name={event.name}
									description={event.description}
									category={event.category}
									location={event.location}
								/>
							))}
						</Fragment>
					);
				}}
			</CQuery>
		</Fragment>
	);
};

export default NewsFeed;
