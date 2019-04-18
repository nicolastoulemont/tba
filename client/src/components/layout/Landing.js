import dayjs from 'dayjs';
import React, { Fragment, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts';
import UserNav from '../navs/userNav';

export default function Landing() {
	const Auth = useContext(AuthContext);

	const notAuth = () => {
		return (
			<Fragment>
				<UserNav />
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
			</Fragment>
		);
	};

	return (
		<Fragment>
			{Auth() ? <Redirect to={`/home/news/${dayjs().format('YYYY-MM-DD')}`} /> : notAuth()}
		</Fragment>
	);
}
