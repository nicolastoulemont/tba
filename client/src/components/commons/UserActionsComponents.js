import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export const Loader = () => {
  return (
    <div className="align-items-center">
      <div className="form-group">
        <div className="alert alert-warning" role="alert">
          Loading...{' '}
        </div>
      </div>
    </div>
  );
};

export const DashboardError = () => {
  return (
    <div className="align-items-center">
      <div className="form-group">
        <div className="alert alert-danger" role="alert">
          Something went wrong, please try to reload the page
        </div>
      </div>
    </div>
  );
};

export const SuccessMsg = ({ msg }) => {
  return (
    <div className="form-group">
      <div className="alert alert-success text-center" role="alert">
        {msg}
      </div>
    </div>
  );
};

export const ErrorMsg = ({ path, message }) => {
  return (
    <li className="list-group-item list-group-item-danger" key={path}>
      <small>{message}</small>
    </li>
  );
};

export const DateLink = ({ string, number, method }) => {
  return (
    <Fragment>
      <div className="col d-none d-md-block p-0 m-0">
        <Link to="#" onClick={method}>
          {' '}
          <h6 className="font-weight-bold text-uppercase lightgrey">
            {string}
          </h6>
          <h6 className="font-weight-bold lightgrey">{number}</h6>
        </Link>
      </div>
      <div className="col d-block d-md-none p-0 m-0">
        <Link to="#" onClick={method}>
          {' '}
          <small className="font-weight-bold d-block text-uppercase lightgrey">
            {string}
          </small>
          <small className="font-weight-bold d-block lightgrey">{number}</small>
        </Link>
      </div>
    </Fragment>
  );
};

export const MonthActions = ({ string, methodOne, methodTwo }) => {
  return (
    <Fragment>
      <div className="col-5 pr-0">
        {' '}
        <Link to="#" onClick={methodOne}>
          <i className="fas fa-chevron-left mt-1" />
        </Link>
      </div>
      <div className="col-2 px-0">
        <h6 className="d-inline font-weight-bold text-uppercase mx-auto">
          {string}
        </h6>
      </div>
      <div className="col-5 pl-0">
        <Link to="#" onClick={methodTwo}>
          <i className="d-inline fas fa-chevron-right" />
        </Link>
      </div>
    </Fragment>
  );
};
