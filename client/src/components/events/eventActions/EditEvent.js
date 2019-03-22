import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
export default function EditEvent(props) {
	const userCheck = props => {
		const currentUser = props.currentUser;
		const eventCreator = props.location.state.event.user_ID;
		console.log(props.location.state.event);
		if (currentUser !== eventCreator) {
			return <Redirect to="/home/news" />;
		} else {
			return (
				<div>
					<h6>Edit event component</h6>
				</div>
			);
		}
	};

	return <Fragment>{userCheck(props)}</Fragment>;
}
