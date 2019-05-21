import React from 'react';
import { Link } from 'react-router-dom';

const DefaultNav = () => {
	return (
		<div className="d-none d-lg-block">
			<nav className="navbar sticky-top navbar-expand-sm bg-white py-1">
				<div className="container px-0">
					<Link className="navbar-brand font-weight-bold align-middle" to="/">
						<h4>MyEU</h4>
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#mobile-nav"
					>
						<span className="navbar-toggler-icon" />
					</button>
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
				</div>
			</nav>
		</div>
	);
};

export default DefaultNav;
