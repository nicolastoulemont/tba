import React from 'react';
import { Link } from 'react-router-dom';

const DefaultNav = () => {
	return (
		<ul className="navbar-nav ml-auto">
			<li className="nav-item pr-4 mt-1">
				<Link
					className="nav-link"
					to="/about"
					data-togggle="tooltip"
					data-placement="bottom"
					title="Learn what services MyEU provides and why"
				>
					<h6 className="d-inline">About</h6>
				</Link>
			</li>
			<li className="nav-item mt-1">
				<Link
					className="nav-link"
					to="/contact"
					data-togggle="tooltip"
					data-placement="bottom"
					title="Contact Us"
				>
					<h6 className="d-inline">Contact</h6>
				</Link>
			</li>
		</ul>
	);
};

export default DefaultNav;
