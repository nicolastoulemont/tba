import React, { Fragment } from 'react';
import CQuery from '../commons/CustomQueryComponent';
import NewsFeedItem from './NewsFeedItem';

import { GET_EVENTS } from '../graphql/event/Queries';

const NewsFeed = ({ user }) => {
	return (
		<Fragment>
			<div className="row m-0 px-2">
				<div className="mb-2 mt-2 w-100">
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
				</div>
			</div>
		</Fragment>
	);
};

export default NewsFeed;
