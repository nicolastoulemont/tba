import React, { Fragment } from 'react';
import CQuery from '../commons/CustomQueryComponent';
import NewsFeedItem from './NewsFeedItem';
import { InputGroup } from '../commons/InputComponents';
import { GET_EVENTS } from '../graphql/event/Queries';

const NewsFeed = ({ user }) => {
	return (
		<Fragment>
			<div className="m-0 px-2">
				<div className="mb-2 mt-2">
					<InputGroup icon="fas fa-search" type="text" placeholder="Search..." />
					<CQuery query={GET_EVENTS}>
						{({ data }) => {
							console.log(data);
							return (
								<div className="border-top">
									{data.events.map(event => (
										<NewsFeedItem key={event.id} currentUser={user} event={event} />
									))}
								</div>
							);
						}}
					</CQuery>
				</div>
			</div>
		</Fragment>
	);
};

export default NewsFeed;
