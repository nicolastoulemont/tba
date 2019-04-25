import React, { useContext } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { EventContext, UserContext } from '../contexts';
import { ADD_REGISTRATION, DELETE_REGISTRATION } from '../graphql/registration/Mutations';
import {
	GET_EVENT_REGISTRATIONS,
	GET_EVENT_REGISTRATIONS_IDS,
	GET_USER_FUTURE_REGISTRATIONS,
	GET_USER_PAST_REGISTRATIONS
} from '../graphql/registration/Queries';

export const RegisterEvent = () => {
	const user = useContext(UserContext);
	const event = useContext(EventContext);

	const today = new Date().toISOString().slice(0, 10);

	const refetchCorrectQuery = () => {
		if (dayjs(event.start).isBefore(dayjs(today))) {
			return { query: GET_USER_PAST_REGISTRATIONS, variables: { user_ID: user.id, date: today } };
		} else if (dayjs(event.start).isAfter(dayjs(today))) {
			return { query: GET_USER_FUTURE_REGISTRATIONS, variables: { user_ID: user.id, date: today } };
		}
	};

	const createRegistration = useMutation(ADD_REGISTRATION, {
		variables: {
			user_ID: user.id,
			event_ID: event.id,
			eventName: event.name,
			eventCity: event.city,
			eventAddress: event.address,
			eventStart: event.start,
			eventEnd: event.end
		},
		refetchQueries: () => {
			return [
				{ query: GET_EVENT_REGISTRATIONS, variables: { event_ID: event.id } },
				{ query: GET_EVENT_REGISTRATIONS_IDS, variables: { event_ID: event.id } },
				refetchCorrectQuery()
			];
		}
	});
	return (
		<Link
			to="#"
			data-togggle="tooltip"
			data-placement="bottom"
			title="Register to this event"
			onClick={e => createRegistration(e)}
			className="btn btn-blue rounded-pill"
		>
			<h6 className="d-inline font-weight-bold text-uppercase ">Register</h6>
		</Link>
	);
};

export const UnRegisterEvent = ({ userRegistration }) => {
	const user = useContext(UserContext);
	const event = useContext(EventContext);
	const today = new Date().toISOString().slice(0, 10);

	const refetchCorrectQuery = () => {
		if (dayjs(event.start).isBefore(dayjs(today))) {
			return { query: GET_USER_PAST_REGISTRATIONS, variables: { user_ID: user.id, date: today } };
		} else if (dayjs(event.start).isAfter(dayjs(today))) {
			return { query: GET_USER_FUTURE_REGISTRATIONS, variables: { user_ID: user.id, date: today } };
		}
	};

	const unRegister = useMutation(DELETE_REGISTRATION, {
		variables: {
			_id: userRegistration.id
		},
		refetchQueries: () => {
			return [
				{ query: GET_EVENT_REGISTRATIONS, variables: { event_ID: event.id } },
				{ query: GET_EVENT_REGISTRATIONS_IDS, variables: { event_ID: event.id } },
				refetchCorrectQuery()
			];
		}
	});
	return (
		<Link
			to="#"
			data-togggle="tooltip"
			data-placement="bottom"
			title="Cancel your registration to this event"
			className="btn btn-orange rounded-pill"
			onClick={e => unRegister(e)}
		>
			<h6 className="d-inline font-weight-bold text-uppercase">Unregister</h6>
		</Link>
	);
};
