import React, { Fragment } from 'react';
import { Spring } from 'react-spring/renderprops';
import CQuery from '../../commons/CustomQueryComponent';
import { InputGroup } from '../../commons/InputComponents';
import { GET_EVENTS } from '../../graphql/event/Queries';
import NewsFeedItem from './feedItem';

const NewsFeed = () => {
	return (
		<Fragment>
			<div className="m-0 px-2">
				<div className="mt-2 mb-4 pb-4">
					<InputGroup icon="fas fa-search" type="text" placeholder="Search..." />
					<div className="border-top">
						<CQuery query={GET_EVENTS}>
							{({ data }) => {
								return (
									<Fragment>
										{data.events.map(event => (
											<Spring from={{ opacity: 0 }} to={{ opacity: 1 }} key={event.id}>
												{props => (
													<div style={props}>
														<NewsFeedItem key={event.id} event={event} />
													</div>
												)}
											</Spring>
										))}
									</Fragment>
								);
							}}
						</CQuery>
					</div>
				</div>
			</div>
		</Fragment>
	);
};
export default NewsFeed;
