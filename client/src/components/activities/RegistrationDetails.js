import React from 'react';
import { Link } from 'react-router-dom';

const RegistrationDetails = ({ registration }) => {
	return (
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
			{new Date(registration.eventStart).getDate() === new Date(registration.eventEnd).getDate() ? (
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
	);
};

export default React.memo(RegistrationDetails);
