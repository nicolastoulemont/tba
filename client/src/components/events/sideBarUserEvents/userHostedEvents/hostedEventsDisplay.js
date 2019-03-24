import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Spring } from 'react-spring/renderprops';

const HostedEventsDisplay = ({ events }) => {
	if (events.length === 0) {
		return (
			<Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
				{props => (
					<div style={props}>
						<small>No events yet</small>
					</div>
				)}
			</Spring>
		);
	} else {
		return (
			<Fragment>
				{events.map(event => {
					return (
						<Spring from={{ opacity: 0 }} to={{ opacity: 1 }} key={event.id}>
							{props => (
								<div style={props}>
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
								</div>
							)}
						</Spring>
					);
				})}
			</Fragment>
		);
	}
};

export default HostedEventsDisplay;
