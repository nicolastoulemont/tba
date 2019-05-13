import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';

const isAuthenticated = () => {
	try {
		const accessToken = localStorage.getItem('access-token');
		const refreshToken = localStorage.getItem('refresh-token');
		if (!accessToken && !refreshToken) return false;
		if (accessToken) {
			decode(accessToken);
		}
		if (!accessToken && refreshToken) {
			decode(refreshToken);
		}
	} catch (err) {
		return false;
	}
	return true;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props => (isAuthenticated() ? <Component {...props} /> : <Redirect to="/" />)}
	/>
);

export default PrivateRoute;
