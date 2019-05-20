import React, { Fragment, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation } from 'react-apollo-hooks';
import DefaultNav from '../navs/userNav/defNav';
import Footer from '../layout/Footer';
import decode from 'jwt-decode';
import { VERIFY_EMAIL } from '../graphql/user/Mutations';
import Spinner from '../commons/Spinner';

const ConfirmEmail = ({ match }) => {
	const [event_ID, setEvent_ID] = useState(null);
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
		if (user && user.event_ID) {
			setEvent_ID(user.event_ID);
		}
		if (user && user.id) {
			setUserId(user.id);
		}
		return;
	}, []);

	if (event_ID) {
		verifyEmail();
		return <Redirect to={{ pathname: `/home/event/${event_ID}` }} />;
	}

	if (userId) {
		verifyEmail();
		return <Redirect to={{ pathname: '/', state: { verified: true } }} />;
	}

	return (
		<Fragment>
			<DefaultNav />
			<Spinner />
			<Footer />
		</Fragment>
	);
};

export default ConfirmEmail;
