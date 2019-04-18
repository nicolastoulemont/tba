import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const UserMobNav = () => {
	const today = new Date().toISOString().slice(0, 10);
	return (
		<Fragment>
			<div className="justify-text-center">
				<div className="mobileNav d-block d-md-none">
					<div className="row">
						<div className="col px-0 text-center pl-1">
							<Link className="nav-link" to="/home/news">
								<i className="fa fa-home" />
							</Link>
						</div>
						<div className="col px-0 text-center">
							<Link className="nav-link" to={`/home/events/${today}`}>
								<i className="far fa-calendar" />
							</Link>
						</div>
						<div className="col px-0 text-center pr-2">
							<Link className="nav-link" to="/home/profiles">
								<i className="fas fa-users" />
							</Link>
						</div>
						<div className="col px-0 text-center pr-2">
							<Link className="nav-link" to="/home/organisations">
								<i className="fas fa-building" />
							</Link>
						</div>
						<div className="col px-0 text-center pr-2">
							<Link className="nav-link" to="/home/organisations">
								<i className="fas fa-bars" />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default UserMobNav;
