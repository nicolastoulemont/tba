import React from 'react';
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
    <div className="col p-0 m-0">
      <Link to="#" onClick={method}>
        {' '}
        <h6 className="font-weight-bold text-uppercase lightgrey">{string}</h6>
        <h6 className="font-weight-bold lightgrey">{number}</h6>
      </Link>
    </div>
  );
};
