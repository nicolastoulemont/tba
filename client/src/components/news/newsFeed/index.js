import React, { Fragment } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { Spring } from 'react-spring/renderprops';
import { InputGroup } from '../../commons/InputComponents';
import { FetchError } from '../../commons/UserActionsComponents';
import { GET_EVENTS } from '../../graphql/event/Queries';
import NewsFeedItem from './feedItem';

const NewsFeed = () => {
	const { data, error } = useQuery(GET_EVENTS, { suspend: true });
	if (error) return <FetchError />;
	return (
		<Fragment>
			<div className="m-0 px-2">
				<div className="mt-2 mb-4 pb-4">
					<InputGroup icon="fas fa-search" type="text" placeholder="Search..." />
					<div className="border-top">
						{data.events.map(event => (
							<Spring from={{ opacity: 0 }} to={{ opacity: 1 }} key={event.id}>
								{props => (
									<div style={props}>
										<NewsFeedItem key={event.id} event={event} />
									</div>
								)}
							</Spring>
						))}
					</div>
				</div>
			</div>
		</Fragment>
	);
};
export default NewsFeed;
