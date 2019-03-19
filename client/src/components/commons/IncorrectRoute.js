import React from 'react';
import { Redirect } from 'react-router-dom';

const IncorrectRoute = () => {
	return <Redirect to="/home" />;
};

export default IncorrectRoute;
