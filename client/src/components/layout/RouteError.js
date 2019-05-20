import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import DefaultNav from '../navs/DefaultNav';
import Footer from './Footer';
import ErrorIcon from '../../img/errorIcon.svg';

const RouteError = props => {
	const goBack = () => {
		props.history.goBack();
	};

	return (
		<Fragment>
			<DefaultNav />
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
