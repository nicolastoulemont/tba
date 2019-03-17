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
							{new Date(event.start).getDate() === new Date(event.end).getDate() ? (
								<small>
									{new Date(event.start).toUTCString().slice(0, 22)} -{' '}
									{new Date(event.end).toTimeString().slice(0, 5)}
								</small>
							) : (
								<small>
									On {new Date(event.start).toUTCString().slice(0, 22)} to{' '}
									{new Date(event.end).toUTCString().slice(0, 22)}
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
