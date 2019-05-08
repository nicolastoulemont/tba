import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Spring } from 'react-spring/renderprops';
import HEventsPanel from './hostedEvents/';
import RegistrationPanel from './registrations';

const SBPanel = () => {
	const [display, setDisplay] = useState('registrations');
	return (
		<Fragment>
			<Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
				{props => (
					<div className="col pr-0" style={props}>
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
									{display === 'registrations' ? <RegistrationPanel /> : <HEventsPanel />}
								</div>
							</div>
						</div>
					</div>
				)}
			</Spring>
		</Fragment>
	);
};

export default SBPanel;
