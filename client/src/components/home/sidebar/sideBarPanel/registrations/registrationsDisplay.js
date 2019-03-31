import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Spring } from 'react-spring/renderprops';

const RegistrationsDisplay = ({ registrations }) => {
	if (registrations.length === 0) {
		return (
			<Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
				{props => (
					<div style={props}>
						<small>No registrations yet</small>
					</div>
				)}
			</Spring>
		);
	} else {
		return (
			<Fragment>
				{registrations.map(registration => {
					return (
						<Spring from={{ opacity: 0 }} to={{ opacity: 1 }} key={registration.id}>
							{props => (
								<div style={props}>
									<div className="text-left px-3 py-2 border-top" key={registration.id}>
										<Link
											to={{
												pathname: `/home/event/${registration.event.id}`
											}}
											className="link-menu"
										>
											<small className="font-weight-bold mr-2 link-menu">
												{registration.event.name}
											</small>
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
								</div>
							)}
						</Spring>
					);
				})}
			</Fragment>
		);
	}
};

export default RegistrationsDisplay;
