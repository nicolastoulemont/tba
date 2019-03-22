import React, { Fragment } from 'react';
import CQuery from '../commons/CustomQueryComponent';
import EventFeedItem from './EventFeedItem';
import DateSelector from './DateSelector';
import { GET_DAY_EVENTS } from '../graphql/event/Queries';

export default function EventFeed(props) {
	const { user, interestOne, interestTwo, interestThree } = props;
	const day = props.match.params.day;
	return (
		<Fragment>
			<div className="row m-0 px-2">
				<div className="mb-2 mt-2 w-100">
					<DateSelector {...props} />
					<CQuery
						query={GET_DAY_EVENTS}
						variables={{ day, interestOne, interestTwo, interestThree }}
					>
						{({ data }) => {
							if (data) {
								if (data.onedayevents.length === 0) {
									return <div className="mt-4 pl-4 font-italic ">No events that day</div>;
								} else {
									return (
										<Fragment>
											{data.onedayevents.map(event => (
												<EventFeedItem key={event.id} currentUser={user} event={event} />
											))}
										</Fragment>
									);
								}
							}
						}}
					</CQuery>
				</div>
			</div>
		</Fragment>
	);
}
