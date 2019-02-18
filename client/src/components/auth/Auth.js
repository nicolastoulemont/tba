import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';

const isAuthenticated = () => {
  const token = localStorage.getItem('jwtToken');
  try {
    decode(token);
  } catch (err) {
    return false;
  }
  return true;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login' }} />
      )
    }
  />
);

export default PrivateRoute;
