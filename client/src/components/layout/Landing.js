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
				<div className="row">
					<div className="col mx-auto text-center">
						<h3 className="my-4 pt-4 text-muted">MyEU</h3>
						<p className="lead">
							{' '}
							Create a profile and monitor the news and events related to the EU
						</p>
						<br />
						<Link to="/register" className="btn btn-lg btn-info mr-2">
							Register
						</Link>
						<Link to="/login" className="btn btn-lg btn-light ml-2">
							Login
						</Link>
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
