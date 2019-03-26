import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { ADD_REGISTRATION, DELETE_REGISTRATION } from '../graphql/registration/Mutations';

export const RegisterEvent = ({ user, event_ID, client }) => {
	const createRegistration = (e, user, event_ID, addRegistration, client) => {
		e.preventDefault();
		addRegistration({
			variables: {
				user_ID: user,
				event_ID
			}
		}).then(res => {
			client.resetStore();
		});
	};

	return (
		<Fragment>
			<Mutation mutation={ADD_REGISTRATION}>
				{(addRegistration, e) => (
					<Link
						to="#"
						data-togggle="tooltip"
						data-placement="bottom"
						title="Register to this event"
						onClick={e => createRegistration(e, user, event_ID, addRegistration, client)}
					>
						<h6 className="d-none d-md-inline font-weight-bold text-uppercase">Register</h6>
					</Link>
				)}
			</Mutation>
		</Fragment>
	);
};

export const UnRegisterEvent = ({ userRegistration, client }) => {
	const unRegister = (e, userRegistration, deleteRegistration, client) => {
		e.preventDefault();
		deleteRegistration({
			variables: {
				_id: userRegistration.id
			}
		}).then(res => {
			client.resetStore();
		});
	};
	return (
		<Fragment>
			<Mutation mutation={DELETE_REGISTRATION}>
				{(deleteRegistration, e) => (
					<Link
						to="#"
						data-togggle="tooltip"
						data-placement="bottom"
						title="Cancel your registration to this event"
						onClick={e => unRegister(e, userRegistration, deleteRegistration, client)}
					>
						<h6 className="d-none d-md-inline font-weight-bold text-uppercase">Unregister</h6>
					</Link>
				)}
			</Mutation>
		</Fragment>
	);
};
