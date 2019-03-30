import React, { Fragment } from 'react';
import CQuery from '../commons/CustomQueryComponent';
import NewsFeedItem from './NewsFeedItem';
import { Spring } from 'react-spring/renderprops';
import { InputGroup } from '../commons/InputComponents';
import { GET_EVENTS } from '../graphql/event/Queries';

const NewsFeed = ({ user }) => {
	return (
		<Fragment>
			<div className="m-0 px-2">
				<div className="mt-2 mb-4 pb-4">
					<InputGroup icon="fas fa-search" type="text" placeholder="Search..." />
					<CQuery query={GET_EVENTS}>
						{({ data }) => {
							return (
								<div className="border-top">
									{data.events.map(event => (
										<Spring from={{ opacity: 0 }} to={{ opacity: 1 }} key={event.id}>
											{props => (
												<div style={props}>
													<NewsFeedItem key={event.id} currentUser={user} event={event} />
												</div>
											)}
										</Spring>
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
