import dayjs from 'dayjs';
import React, { Fragment, useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts';
import DefaultNav from '../navs/DefaultNav';
import Footer from './Footer';
import Login from '../auth/Login';
import Register from '../auth/Register';
import classNames from 'classnames';

const Landing = props => {
	const Auth = useContext(AuthContext);
	const [showLogIn, setShowLogIn] = useState(false);

	const notAuth = () => {
		return (
			<Fragment>
				<DefaultNav />
				<div className="container px-4">
					<div className="row">
						<div className="col landing-call">
							<div className="row px-4">
								<div className="col-lg text-center bg-white">
									<div className="row">
										<div className="col">
											<h4 className="py-3 text-blue">MyEU</h4>
										</div>
									</div>
									<div className="row">
										<div className="col p-4">
											<p className="text-justify ">
												MyEU tracks EU Public Affairs news and events, allowing you to :
											</p>
											<p className="text-justify">
												<span className="font-weight-bold text-blue">Quickly monitor</span> news
												from all the EU institutions and stakeholders at a glance,{' '}
												<span className="font-weight-bold text-blue">at any time</span>.
											</p>
											<p className="text-justify">
												<span className="font-weight-bold text-blue">Never miss</span> EU related
												events happening in the EU Affairs district.
											</p>
											<div className="d-block">
												<p className="text-justify p-0 m-0">
													<span className="font-weight-bold text-blue">Publish</span> EU related
													events on the plateform to :
												</p>
												<ul>
													<li className="text-justify">
														{' '}
														- <span className="font-weight-bold text-blue">Gain</span> more
														visibility and increase engagement levels.
													</li>
													<li className="text-justify">
														{' '}
														- <span className="font-weight-bold text-blue">Easily</span> manage your
														events registrations and Q&A.
													</li>
													<li className="text-justify">
														{' '}
														- <span className="font-weight-bold text-blue">Enjoy</span> a quick and
														easy registration process.
													</li>
												</ul>
											</div>
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
