import React from 'react';
import { Link } from 'react-router-dom';
import CreateEventModal from '../events/CreateEventModal';

const MobileNav = () => {
	return (
		<div className="justify-text-center">
			<div className="mobileNav d-block d-md-none">
				<div className="row">
					<div className="col px-0 text-center pl-1">
						<Link className="nav-link" to="/home">
							<i className="text-white fa fa-home" />
						</Link>
					</div>
					<div className="col px-0 text-white text-center">
						<Link className="nav-link" to="#" data-toggle="modal" data-target="#CreateEventModal">
							<i className="text-white fa fa-plus" />
						</Link>
					</div>
					<div className="col px-0 text-white text-center pr-2">
						<Link className="nav-link" to="#">
							<i className="text-white fas fa-cog" />
						</Link>
					</div>
				</div>
			</div>
			<CreateEventModal />
		</div>
	);
};

export default MobileNav;
