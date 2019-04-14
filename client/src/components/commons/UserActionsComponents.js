import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export const Loader = () => (
	<div className="align-items-center">
		<div className="form-group">
			<div className="alert alert-warning" role="alert">
				Loading...{' '}
			</div>
		</div>
	</div>
);

export const FetchError = () => (
	<div className="align-items-center">
		<div className="form-group">
			<div className="alert alert-danger" role="alert">
				Something went wrong, please try to reload the page
			</div>
		</div>
	</div>
);

export const SuccessMsg = ({ msg }) => (
	<div className="form-group">
		<div className="alert alert-success text-center" role="alert">
			{msg}
		</div>
	</div>
);

export const ErrorMsg = ({ path, message }) => (
	<li className="list-group-item list-group-item-danger" key={path}>
		<small>{message}</small>
	</li>
);

export const DateLink = ({ string, number, path }) => (
	<Fragment>
		<div className="col d-none d-md-block p-0 m-0">
			<Link to={path}>
				{' '}
				<h6 className="font-weight-bold text-uppercase lightgrey">{string}</h6>
				<h6 className="font-weight-bold lightgrey">{number}</h6>
			</Link>
		</div>
		<div className="col d-block d-md-none p-0 m-0">
			<Link to={path}>
				{' '}
				<small className="font-weight-bold d-block text-uppercase lightgrey">{string}</small>
				<small className="font-weight-bold d-block lightgrey">{number}</small>
			</Link>
		</div>
	</Fragment>
);

export const WeekAction = ({ icon, path, tooltip }) => (
	<div className="col p-0 m-0">
		<Link to={path} data-togggle="tooltip" data-placement="bottom" title={tooltip}>
			<i className={icon} />
		</Link>
	</div>
);

export const MonthActions = ({ string, pathOne, pathTwo }) => (
	<Fragment>
		<div className="col mt-1">
			{' '}
			<Link to={pathOne} data-togggle="tooltip" data-placement="bottom" title="Previous Month">
				<i className="fas fa-chevron-left" />
			</Link>
		</div>
		<div className="col mt-1">
			<h6 className="font-weight-bold text-uppercase mx-auto">{string}</h6>
		</div>
		<div className="col mt-1">
			<Link to={pathTwo} data-togggle="tooltip" data-placement="bottom" title="Next Month">
				<i className="fas fa-chevron-right" />
			</Link>
		</div>
	</Fragment>
);
