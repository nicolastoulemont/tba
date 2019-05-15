import React, { Fragment, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation } from 'react-apollo-hooks';
import UserNav from '../navs/userNav';
import Footer from '../layout/Footer';
import decode from 'jwt-decode';
import { VERIFY_EMAIL } from '../graphql/user/Mutations';
import Spinner from '../commons/Spinner';

const ConfirmEmail = ({ match }) => {
	const [userId, setUserId] = useState(null);

	const verifyEmail = useMutation(VERIFY_EMAIL, { variables: { _id: userId } });

	useEffect(() => {
		const token = match.params.emailToken;
		const getUser = token => {
			try {
				return decode(token);
			} catch {}
		};
		const user = getUser(token);
		if (user && user.id) {
			setUserId(user.id);
		}
	}, []);

	if (userId) {
		verifyEmail();
		return <Redirect to={{ pathname: '/', state: { verified: true } }} />;
	}

	return (
		<Fragment>
			<UserNav />
			<Spinner />
			<Footer />
		</Fragment>
	);
};

export default ConfirmEmail;
