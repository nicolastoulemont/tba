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
			<DateSelector {...props} />
			<CQuery query={GET_DAY_EVENTS} variables={{ day, interestOne, interestTwo, interestThree }}>
				{({ data }) => {
					if (data) {
						if (data.onedayevents.length === 0) {
							return <div className="mt-4 pl-4 font-italic ">No events that day</div>;
						} else {
							return (
								<Fragment>
									<div>
										{data.onedayevents.map(event => (
											<EventFeedItem
												key={event.id}
												currentUser={user}
												user_ID={event.user_ID}
												event_ID={event.id}
												name={event.name}
												abstract={event.abstract}
												creator={event.creator}
												categoryOne={event.categoryOne}
												categoryTwo={event.categoryTwo}
												categoryThree={event.categoryThree}
												location={event.location}
												start={event.start}
												end={event.end}
											/>
										))}
									</div>
								</Fragment>
							);
						}
					}
				}}
			</CQuery>
		</Fragment>
	);
}
