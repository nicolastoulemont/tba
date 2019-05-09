import React from 'react';
import { Link } from 'react-router-dom';

const DefaultNav = () => {
	return (
		<div className="collapse navbar-collapse" id="mobile-nav">
			<ul className="navbar-nav ml-auto">
				<li className="nav-item pr-4 mt-1">
					<Link
						className="nav-link"
						to="/about"
						data-togggle="tooltip"
						data-placement="bottom"
						title="Learn what service MyEU provides and why"
					>
						<h6>About</h6>
					</Link>
				</li>
				<li className="nav-item pr-4 mt-1">
					<Link
						className="nav-link"
						to="/documentation"
						data-togggle="tooltip"
						data-placement="bottom"
						title="Learn how MyEU work and why"
					>
						<h6>Documentation</h6>
					</Link>
				</li>
				<li className="nav-item pr-4 mt-1">
					<Link
						className="nav-link"
						to="/contact"
						data-togggle="tooltip"
						data-placement="bottom"
						title="Contact Us"
					>
						<h6>Contact</h6>
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default DefaultNav;
