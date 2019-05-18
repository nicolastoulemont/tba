import React, { useContext, Fragment } from 'react';
import { AuthContext } from '../../contexts';
import DefaultNav from './defNav';
import UNav from './uNav';

const UserNav = () => {
	const Auth = useContext(AuthContext);

	return <Fragment>{Auth() ? <UNav /> : <DefaultNav />}</Fragment>;
};

export default UserNav;
