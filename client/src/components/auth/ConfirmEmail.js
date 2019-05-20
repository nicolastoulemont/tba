import React, { Fragment, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Mutation } from 'react-apollo';
import DefaultNav from '../navs/userNav/defNav';
import Footer from '../layout/Footer';
import decode from 'jwt-decode';
import { VERIFY_EMAIL } from '../graphql/user/Mutations';
import Spinner from '../commons/Spinner';

const ConfirmEmail = props => {
	const [event_ID, setEvent_ID] = useState(null);
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		const token = props.match.params.emailToken;
		const getUser = token => {
			try {
				return decode(token);
			} catch {}
		};
		const user = getUser(token);
		if (user && user.event_ID) {
			setEvent_ID(user.event_ID);
			setUserId(user.id);
		}
		if (user && user.id && !user.event_ID) {
			setUserId(user.id);
		}
		return;
	}, []);

	const CallMutation = props => {
		useEffect(() => {
			props.verifyEmail();
			return;
		}, []);
		return props.children;
	};

	const responseRouter = data => {
		const { ok, accessToken, refreshToken } = data.verifyEmail;
		if (!ok) return null;
		if (ok) {
			localStorage.setItem('access-token', accessToken);
			localStorage.setItem('refresh-token', refreshToken);
			if (userId && event_ID) {
				setTimeout(() => props.history.push(`/home/event/${event_ID}`), 50);
			}
			if (userId && !event_ID) {
				setTimeout(() => props.history.push(`/home/news/${dayjs().format('YYYY-MM-DD')}`), 50);
			}
		}
	};

	return (
		<Fragment>
			<DefaultNav />
			{userId ? (
				<Mutation mutation={VERIFY_EMAIL} variables={{ _id: userId }}>
					{(verifyEmail, { data }) => {
						data && responseRouter(data);
						return (
							<CallMutation verifyEmail={verifyEmail}>
								<Spinner />
							</CallMutation>
						);
					}}
				</Mutation>
			) : (
				<Spinner />
			)}
			<Footer />
		</Fragment>
	);
};

export default ConfirmEmail;
