import React, { useContext } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { Redirect } from 'react-router-dom';
import dayjs from 'dayjs';
import { UserContext } from '../../contexts';
import { useStateValue } from '../../contexts/InitialState';
import { DELETE_EVENT } from '../../graphql/event/Mutations';
import {
	GET_EVENTS,
	GET_USER_FUTURE_HOSTED_EVENTS,
	GET_USER_PAST_HOSTED_EVENTS
} from '../../graphql/event/Queries';

const DeleteEvent = ({ match, history }) => {
	const [{ stateEvent }, dispatch] = useStateValue();
	const user = useContext(UserContext);

	if (stateEvent.user_ID === null || stateEvent.user_ID !== user.id)
		return <Redirect to={`/home/event/${match.params.id}`} />;

	const refetchCorrectQuery = () => {
		const today = new Date().toISOString().slice(0, 10);
		if (dayjs(stateEvent.start).isBefore(dayjs(today))) {
			return { query: GET_USER_PAST_HOSTED_EVENTS, variables: { user_ID: user.id, date: today } };
		} else if (dayjs(stateEvent.start).isAfter(dayjs(today))) {
			return { query: GET_USER_FUTURE_HOSTED_EVENTS, variables: { user_ID: user.id, date: today } };
		}
	};

	const delEvent = useMutation(DELETE_EVENT, {
		variables: { _id: stateEvent.id, user_ID: user.id },
		refetchQueries: () => {
			return [{ query: GET_EVENTS }, refetchCorrectQuery()];
		}
	});

	const eventDeletion = () => {
		delEvent();
		dispatch({ type: 'RESET_EVENT' });
		history.push('/home/news');
	};
	const redirection = e => {
		history.push(`/home/event/${stateEvent.id}`);
	};

	return (
		<div className="p-4">
			<div className="alert alert-warning" role="alert">
				You are going to delete the following event :{' '}
				<span className="font-italic">{stateEvent.name}</span>
			</div>
			<div>
				<button className="btn btn-outline-secondary d-inline mr-2" onClick={redirection}>
					Go Back
				</button>
				<button className="btn btn-outline-danger d-inline ml-2" onClick={eventDeletion}>
					Delete Event
				</button>
			</div>
		</div>
	);
};

export default DeleteEvent;
