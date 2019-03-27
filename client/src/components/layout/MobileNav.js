import React from 'react';
import { Link } from 'react-router-dom';

export default function MobileNav() {
	const today = new Date().toISOString().slice(0, 10);
	return (
		<div className="justify-text-center">
			<div className="mobileNav d-block d-md-none">
				<div className="row">
					<div className="col px-0 text-center pl-1">
						<Link className="nav-link" to="/home/news">
							<i className="text-white fa fa-home" />
						</Link>
					</div>
					<div className="col px-0 text-white text-center">
						<Link className="nav-link" to={`/home/events/${today}`}>
							<i className="text-white far fa-calendar" />
						</Link>
					</div>
					<div className="col px-0 text-white text-center pr-2">
						<Link className="nav-link" to="/home/profiles">
							<i className="text-white fas fa-users" />
						</Link>
					</div>
					<div className="col px-0 text-white text-center pr-2">
						<Link className="nav-link" to="/home/organisations">
							<i className="text-white fas fa-building" />
						</Link>
					</div>
					<div className="col px-0 text-white text-center pr-2">
						<Link className="nav-link" to="/home/organisations">
							<i className="text-white fas fa-bars" />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
