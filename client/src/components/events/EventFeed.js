import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Spring } from 'react-spring/renderprops';
import CQuery from '../commons/CustomQueryComponent';
import EventFeedItem from './EventFeedItem';
import DateSelector from './DateSelector';
import { GET_DAY_EVENTS } from '../graphql/event/Queries';
import dayjs from 'dayjs';

export default function EventFeed(props) {
	const { user, interestOne, interestTwo, interestThree } = props;
	const day = props.match.params.day;

	const validateDate = day => {
		const today = new Date();
		if (!dayjs(day).isValid())
			return <Redirect to={`/home/events/${dayjs(today).format('YYYY-MM-DD')}`} />;
		return (
			<Fragment>
				<div className="row m-0 px-2">
					<div className="mt-2 mb-4 pb-4">
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
													<Spring from={{ opacity: 0 }} to={{ opacity: 1 }} key={event.id}>
														{props => (
															<div style={props}>
																<EventFeedItem key={event.id} currentUser={user} event={event} />
															</div>
														)}
													</Spring>
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
	};

	return <Fragment>{validateDate(day)}</Fragment>;
}
