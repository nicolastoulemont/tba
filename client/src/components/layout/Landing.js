import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';

export default function Landing() {
	const hasToken = () => {
		const token = localStorage.getItem('token');
		try {
			decode(token);
		} catch (err) {
			return false;
		}
		return true;
	};

	const hasNoToken = () => (
		<div className="landing">
			<div className="dark-overlay landing-inner text-light">
				<div className="container">
					<div className="row">
						<div className="col-md-12 text-center">
							<h1 className="display-3 mb-4">EU-WATCHER</h1>
							<p className="lead">
								{' '}
								Create a profile and monitor the news and events related to the EU
							</p>
							<hr />
							<Link to="/register" className="btn btn-lg btn-info mr-2">
								Register
							</Link>
							<Link to="/login" className="btn btn-lg btn-light">
								Login
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	return <Fragment>{hasToken() ? <Redirect to="/home/news" /> : hasNoToken()}</Fragment>;
}
