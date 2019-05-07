import React from 'react';
import { Link } from 'react-router-dom';
import { Spring } from 'react-spring/renderprops';

const PanelItem = ({ registration, event }) => {
	if (registration) {
		return (
			<Spring from={{ opacity: 0 }} to={{ opacity: 1 }} key={registration.id}>
				{props => (
					<div style={props}>
						<div className="text-left px-3 py-2 border-bottom">
							<Link
								to={{
									pathname: `/home/event/${registration.event_ID}`
								}}
								className="link-menu"
							>
								<small className="font-weight-bold mr-2">{registration.eventName}</small>
							</Link>
							<small className="d-block">
								{registration.eventAddress},{registration.eventCity}
							</small>
							{new Date(registration.eventStart).getDate() ===
							new Date(registration.eventEnd).getDate() ? (
								<small>
									{new Date(registration.eventStart).toUTCString().slice(0, 22)} -{' '}
									{new Date(registration.eventEnd).toTimeString().slice(0, 5)}
								</small>
							) : (
								<small>
									On {new Date(registration.eventStart).toUTCString().slice(0, 22)} to{' '}
									{new Date(registration.eventEnd).toUTCString().slice(0, 22)}
								</small>
							)}
						</div>
					</div>
				)}
			</Spring>
		);
	} else if (event) {
		console.log(event);
		return (
			<Spring from={{ opacity: 0 }} to={{ opacity: 1 }} key={event.id}>
				{props => (
					<div style={props}>
						<div className="text-left px-3 py-2 border-bottom">
							<Link
								to={{
									pathname: `/home/event/${event.id}`
								}}
								className="link-menu"
							>
								<small className="font-weight-bold mr-2">{event.name}</small>
							</Link>
							<small className="d-block">
								{event.address}, {event.city}
							</small>
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
	}
	return null;
};

export default React.memo(PanelItem);
