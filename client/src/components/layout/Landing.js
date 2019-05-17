import dayjs from 'dayjs';
import React, { Fragment, useContext, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts';
import UserNav from '../navs/userNav';
import Footer from './Footer';
import Login from '../auth/Login';
import Register from '../auth/Register';
import classNames from 'classnames';

const Landing = props => {
	const Auth = useContext(AuthContext);
	const [showLogIn, setShowLogIn] = useState(false);

	useEffect(() => {
		if (props.location.state && props.location.state.verified) {
			setShowLogIn(true);
		}
	});

	const notAuth = () => {
		return (
			<Fragment>
				<UserNav />
				<div className="container px-4">
					<div className="row">
						<div className="col landing-call">
							<div className="row px-4">
								<div className="col-lg text-center bg-white">
									<div className="row">
										<div className="col">
											<h3 className="text-muted brand">MyEU</h3>
										</div>
									</div>
									<div className="row">
										<div className="col p-4">
											<h6 className="text-left text-muted pb-2">
												MyEU tracks all EU Public Affairs news and events, allowing you to :
											</h6>
											<h6 className="text-left text-muted py-2">
												- Monitor the news from all the EU institutions and EU Public Affairs actors
												at a glance, at any time.
											</h6>
											<h6 className="text-left text-muted py-2">
												- Never miss EU related events happening in the EU Affairs district.
											</h6>
											<h6 className="text-left text-muted pt-2 pb-1">
												- Publish EU related events on the plateform to :
											</h6>
											<h6 className="text-left text-muted py-0 pl-3">
												- Manage your events registrations and Q&A easily.
											</h6>
											<h6 className="text-left text-muted py-0 pl-3">
												- A quick and easy registration process.
											</h6>
											<h6 className="text-left text-muted py-0 pl-3">
												- Gain more visibility and increase engagement levels.
											</h6>
										</div>
									</div>
								</div>
								<div className="col-lg text-center bg-white register">
									<div className="row border-bottom">
										<div className={classNames('col', { 'bg-blue text-white': !showLogIn })}>
											<Link
												to="#"
												onClick={e => setShowLogIn(false)}
												className={classNames('p-1', { 'text-white': !showLogIn })}
											>
												<h6>Register</h6>
											</Link>
										</div>
										<div className={classNames('col border-left', { 'bg-blue': showLogIn })}>
											{' '}
											<Link
												to="#"
												className={classNames('p-1', { 'text-white': showLogIn })}
												onClick={e => setShowLogIn(true)}
											>
												<h6>Login</h6>
											</Link>
										</div>
									</div>
									<div className="row">
										{showLogIn ? (
											<Login history={props.history} />
										) : (
											<Register history={props.history} />
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<Footer />
			</Fragment>
		);
	};

	return (
		<Fragment>
			{Auth() ? <Redirect to={`/home/news/${dayjs().format('YYYY-MM-DD')}`} /> : notAuth()}
		</Fragment>
	);
};

export default Landing;
