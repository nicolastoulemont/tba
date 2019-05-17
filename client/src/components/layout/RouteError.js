import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import DefaultNav from '../navs/userNav/defNav';
import Footer from './Footer';
import ErrorIcon from '../../img/errorIcon.svg';

const RouteError = props => {
	const goBack = () => {
		props.history.goBack();
	};

	return (
		<Fragment>
			<div className="d-none d-lg-block">
				<nav className="navbar sticky-top navbar-expand-sm bg-white py-1">
					<div className="container px-0">
						<Link className="navbar-brand font-bold align-middle" to="/">
							<h4 className="text-muted">MyEU</h4>
						</Link>
						<button
							className="navbar-toggler"
							type="button"
							data-toggle="collapse"
							data-target="#mobile-nav"
						>
							<span className="navbar-toggler-icon" />
						</button>
						<DefaultNav />
					</div>
				</nav>
			</div>
			<div className="container">
				<div className="row">
					<div className="col">
						<div className="row mt-2 bg-white">
							<div className="col p-4 mt-4">
								<img src={ErrorIcon} alt="Error Icon" className="error-icon" />
							</div>
							<div className="col p-4 mt-4">
								<div className="d-block mx-auto">
									<h6 className="text-left text-muted py-2">
										The page you requested doesn't exist.
									</h6>
									<h6 className="text-left text-muted py-2">
										To go back to your last page, click{` `}
										<Link to="#" className="font-weight-bold text-blue" onClick={goBack}>
											here
										</Link>
										.
									</h6>
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

export default RouteError;
