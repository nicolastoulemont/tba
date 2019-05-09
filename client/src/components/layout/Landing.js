import dayjs from 'dayjs';
import React, { Fragment, useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts';
import UserNav from '../navs/userNav';
import Footer from './Footer';
import LandingLog from './LandingLog';
import LandingReg from './LandingReg';
import classNames from 'classnames';

const Landing = () => {
	const Auth = useContext(AuthContext);
	const [showLogIn, setShowLogIn] = useState(false);

	const notAuth = () => {
		return (
			<Fragment>
				<UserNav />
				<div className="container px-4">
					<div className="row">
						<div className="col landing-call">
							<div className="row px-4">
								<div className="col text-center bg-white">
									<h3 className="text-muted p-1">MyEU</h3>
									<p>Monitor the news and events related to the EU</p>
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
									<div className="row">{showLogIn ? <LandingLog /> : <LandingReg />}</div>
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
