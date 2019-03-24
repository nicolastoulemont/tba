import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ApolloClient } from 'apollo-boost';

class Navbar extends Component {
	LogOut = e => {
		localStorage.removeItem('jwtToken');
		localStorage.removeItem('uuid');
		ApolloClient.resetStore();
	};
	render() {
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
						<div className="collapse navbar-collapse" id="mobile-nav">
							<ul className="navbar-nav ml-auto">
								<li className="nav-item pr-4">
									<Link className="nav-link" to="/home/news">
										<i className="d-inline fa fa-home" />
										<h6 className="d-inline ml-2">Home</h6>
									</Link>
								</li>
								<li className="nav-item pr-4">
									<Link className="nav-link" to={`/home/events/${today}`}>
										<i className="d-inline far fa-calendar" />
										<h6 className="d-inline ml-2">Events</h6>
									</Link>
								</li>
								<li className="nav-item pr-4">
									<Link className="nav-link" to="/home/profiles">
										<i className="d-inline fas fa-users" />
										<h6 className="d-inline ml-2">Profiles</h6>
									</Link>
								</li>
								<li className="nav-item pr-4">
									<Link className="nav-link" to="/home/organisations">
										<i className="d-inline fas fa-building" />
										<h6 className="d-inline ml-2">Organisations</h6>
									</Link>
								</li>
								<li className="nav-item pl-4">
									<Link className="nav-link" to="/login" onClick={this.LogOut}>
										<i className="fa fa-power-off" />
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</div>
		);
	}
}

export default Navbar;
