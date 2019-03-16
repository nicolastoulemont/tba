import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const HostedEventsDisplay = ({ events }) => {
	if (events.length === 0) {
		return (
			<Fragment>
				<div className="text-left pl-4 ml-1">
					<small>No events yet</small>
				</div>
			</Fragment>
		);
	} else {
		return (
			<Fragment>
				{events.map(event => {
					return (
						<div className="text-left px-3 py-2 border-top" key={event.id}>
							<Link
								to={{
									pathname: `/event/${event.id}`
								}}
								className="link-menu"
							>
								<small className="font-weight-bold mr-2 link-menu">{event.name}</small>
							</Link>
							<small className="d-block">{event.location}</small>
							{event.startDate === event.endDate ? (
								<small className="d-block">
									{new Date(event.startDate).toDateString()} from {event.startTime} to {event.endTime}
								</small>
							) : (
								<small className="d-block">
									From {new Date(event.startDate).toDateString()} at {event.startTime} to{' '}
									{new Date(event.endDate).toDateString()} at {event.endTime}
								</small>
							)}
						</div>
					);
				})}
			</Fragment>
		);
	}
};

export default HostedEventsDisplay;
