import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import HEventsPanel from './hostedEvents/';
import RegistrationPanel from './registrations';

export default function SBPanel({ user }) {
	const [display, setDisplay] = useState('registrations');
	return (
		<Fragment>
			<div className="col pr-0">
				<div className="ml-2 bg-white">
					<div className="row m-0 p-0">
						<div className="col border-right p-0 pt-1">
							<Link
								className="link-menu"
								to="#"
								onClick={() => setDisplay('registrations')}
								data-togggle="tooltip"
								data-placement="bottom"
								title="Your registrations"
							>
								<h6 className="d-inline">Registrations</h6>
							</Link>
						</div>
						<div className="col p-0 pt-1">
							<Link
								to="#"
								className="link-menu"
								onClick={() => setDisplay('events')}
								data-togggle="tooltip"
								data-placement="bottom"
								title="Your hosted events"
							>
								<h6 className="d-inline">Hosted events</h6>
							</Link>
						</div>
					</div>
					<div className="row  m-0 p-0">
						<div className="mt-1 w-100">
							{display === 'registrations' ? (
								<RegistrationPanel user={user} />
							) : (
								<HEventsPanel user={user} />
							)}
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
