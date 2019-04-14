import React from 'react';
import { useMutation } from 'react-apollo-hooks';
import { Link } from 'react-router-dom';
import { ADD_REGISTRATION } from '../graphql/registration/Mutations';
import { GET_EVENT_REGISTRATIONS_IDS } from '../graphql/registration/Queries';

export const RegisterEvent = ({ user, event }) => {
	const createRegistration = useMutation(ADD_REGISTRATION, {
		variables: {
			user_ID: user,
			event_ID: event.id,
			eventName: event.name,
			eventLocation: event.location,
			eventStart: event.start,
			eventEnd: event.end
		},
		refetchQueries: () => {
			return [{ query: GET_EVENT_REGISTRATIONS_IDS, variables: { id: event.id } }];
		}
	});
	return (
		<Link
			to="#"
			data-togggle="tooltip"
			data-placement="bottom"
			title="Register to this event"
			onClick={e => createRegistration(e)}
		>
			<h6 className="d-none d-md-inline font-weight-bold text-uppercase">Register</h6>
		</Link>
	);
};

export const UnRegisterEvent = ({ userRegistration, event_ID }) => {
	const unRegister = useMutation(ADD_REGISTRATION, {
		variables: {
			_id: userRegistration.id
		},
		refetchQueries: () => {
			return [{ query: GET_EVENT_REGISTRATIONS_IDS, variables: { id: event_ID } }];
		}
	});
	return (
		<Link
			to="#"
			data-togggle="tooltip"
			data-placement="bottom"
			title="Cancel your registration to this event"
			onClick={e => unRegister(e)}
		>
			<h6 className="d-none d-md-inline font-weight-bold text-uppercase">Unregister</h6>
		</Link>
	);
};
