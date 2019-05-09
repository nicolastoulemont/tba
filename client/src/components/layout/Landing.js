import dayjs from 'dayjs';
import React, { Fragment, useContext, useState } from 'react';
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
	console.log(props);
	const notAuth = () => {
		return (
			<Fragment>
				<UserNav />
				<div className="container px-4">
					<div className="row">
						<div className="col landing-call">
							<div className="row px-4">
								<div className="col text-center bg-white">
									<div className="row">
										<div className="col">
											<h3 className="text-muted p-3">MyEU</h3>
										</div>
									</div>
									<div className="row">
										<div className="col p-4">
											<h6 className="text-left text-muted pb-2">
												MyEU is a plateform that aggregate news and events related to the EU Public
												Affairs :
											</h6>
											<h6 className="text-left text-muted py-2">
												Monitor the news from all the EU institutions and EU Public Affairs actors
												at a glance
											</h6>
											<h6 className="text-left text-muted py-2">
												Never miss EU related events happening in the EU Affairs district
											</h6>
											<h6 className="text-left text-muted py-2">
												Hosted EU related events on the plateform to gain more visibility
											</h6>
										</div>
									</div>
								</div>
								<div className="col text-center bg-white border-left">
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
										{showLogIn ? <Login history={props.history} /> : <Register />}
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
