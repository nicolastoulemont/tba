import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const RegistrationsDisplay = ({ registrations }) => {
	if (registrations.length === 0) {
		return (
			<Fragment>
				<div className="text-left pl-4 ml-1">
					<small>No registrations yet</small>
				</div>
			</Fragment>
		);
	} else {
		return (
			<Fragment>
				{registrations.map(registration => {
					return (
						<div className="text-left px-3 py-2 border-top" key={registration.id}>
							<Link
								to={{
									pathname: `/event/${registration.event.id}`
								}}
								className="link-menu"
							>
								<small className="font-weight-bold mr-2 link-menu">{registration.event.name}</small>
							</Link>
							<small className="d-block">{registration.event.location}</small>
							{new Date(registration.event.start).getDate() ===
							new Date(registration.event.end).getDate() ? (
								<small>
									{new Date(registration.event.start).toUTCString().slice(0, 22)} -{' '}
									{new Date(registration.event.end).toTimeString().slice(0, 5)}
								</small>
							) : (
								<small>
									On {new Date(registration.event.start).toUTCString().slice(0, 22)} to{' '}
									{new Date(registration.event.end).toUTCString().slice(0, 22)}
								</small>
							)}
						</div>
					);
				})}
			</Fragment>
		);
	}
};

export default RegistrationsDisplay;
