import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
const Error404 = () => {
	return (
		<Fragment>
			<div className="row">
				<div className="col">
					<h6>Error 404 img</h6>
				</div>
				<div className="col">
					<p>Error 404 : The page you are looking for doesn't exist</p>
					<Link to="/home/news/" className="btn btn-secondary">
						Go back to home page
					</Link>
				</div>
			</div>
		</Fragment>
	);
};

export default Error404;
