import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';

export default function DeleteEvent(props) {
	const userCheck = props => {
		const currentUser = props.currentUser;
		const eventCreator = props.location.state.event.user_ID;
		if (currentUser !== eventCreator) {
			return <Redirect to="/home/news" />;
		} else {
			return (
				<div>
					<h6>Delete event component</h6>
				</div>
			);
		}
	};

	return <Fragment>{userCheck(props)}</Fragment>;
}
