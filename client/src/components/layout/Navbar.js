import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ApolloClient } from 'apollo-boost';
import { AuthContext } from '../contexts';

export default function Navbar() {
	const Auth = useContext(AuthContext);

	const logOut = e => {
		localStorage.removeItem('token');
		localStorage.removeItem('uuid');
		ApolloClient.resetStore();
	};
	const today = new Date().toISOString().slice(0, 10);

	return (
		<div className="d-none d-md-block">
			<nav className="navbar sticky-top navbar-expand-sm bg-white border-bottom">
				<div className="container px-0">
					<Link className="navbar-brand text-black" to="/">
						EU-WATCHER
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#mobile-nav"
					>
						<span className="navbar-toggler-icon" />
					</button>
					{Auth() ? (
						<div className="collapse navbar-collapse" id="mobile-nav">
							<ul className="navbar-nav ml-auto">
								<li className="nav-item pr-4">
									<Link
										className="nav-link"
										to="/home/news"
										data-togggle="tooltip"
										data-placement="bottom"
										title="Find out about all the EU affairs news"
									>
										<i className="d-inline fa fa-home" />
										<h6 className="d-inline ml-2">Home</h6>
									</Link>
								</li>
								<li className="nav-item pr-4">
									<Link
										className="nav-link"
										to={`/home/events/${today}`}
										data-togggle="tooltip"
										data-placement="bottom"
										title="Find all the EU related events"
									>
										<i className="d-inline far fa-calendar" />
										<h6 className="d-inline ml-2">Events</h6>
									</Link>
								</li>
								<li className="nav-item pr-4">
									<Link
										className="nav-link"
										to="/home/profiles"
										data-togggle="tooltip"
										data-placement="bottom"
										title="Find the people your looking for"
									>
										<i className="d-inline fas fa-users" />
										<h6 className="d-inline ml-2">Profiles</h6>
									</Link>
								</li>
								<li className="nav-item pr-4">
									<Link
										className="nav-link"
										to="/home/organisations"
										data-togggle="tooltip"
										data-placement="bottom"
										title="Find all the EU related organisations (EU institutions, political parties, associations, etc)"
									>
										<i className="d-inline fas fa-building" />
										<h6 className="d-inline ml-2">Organisations</h6>
									</Link>
								</li>
								<li className="nav-item pl-4">
									<Link
										className="nav-link"
										to="/login"
										onClick={e => logOut(e)}
										data-togggle="tooltip"
										data-placement="bottom"
										title="Log Out"
									>
										<i className="fa fa-power-off" />
									</Link>
								</li>
							</ul>
						</div>
					) : null}
				</div>
			</nav>
		</div>
	);
}
