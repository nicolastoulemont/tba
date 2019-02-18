import React from 'react';

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
