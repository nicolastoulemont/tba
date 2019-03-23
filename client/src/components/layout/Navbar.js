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
		return (
			<div className="top-menu">
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
								<li className="nav-item pr-2">
									<Link className="nav-link" to="/home/news">
										<i className="fa fa-home" />
									</Link>
								</li>
								<li className="nav-item pr-2">
									<Link className="nav-link" to="/create-post">
										<i className="far fa-paper-plane" />
									</Link>
								</li>
								<li className="nav-item border-right pr-4">
									<Link
										className="nav-link"
										to="#"
									>
										<i className="fa fa-plus" />
									</Link>
								</li>

								<li className="nav-item pl-4">
									<Link className="nav-link" to="/about">
										About
									</Link>
								</li>
								<li className="nav-item pr-4">
									<Link className="nav-link" to="/docs">
										Docs
									</Link>
								</li>
								<li className="nav-item">
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
