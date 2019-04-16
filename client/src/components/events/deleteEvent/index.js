import React, { useContext } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../contexts';
import { useStateValue } from '../../contexts/InitialState';
import { DELETE_EVENT } from '../../graphql/event/Mutations';

const DeleteEvent = ({ match, history }) => {
	const [{ stateEvent }, dispatch] = useStateValue();
	const user = useContext(UserContext);

	if (stateEvent.user_ID === null || stateEvent.user_ID !== user.id)
		return <Redirect to={`/home/event/${match.params.id}`} />;

	const delEvent = useMutation(DELETE_EVENT, {
		variables: { _id: stateEvent.id, user_ID: user.id }
	});

	const eventDeletion = () => {
		delEvent();
		dispatch({ type: 'RESET_EVENT' });
		history.push('/home/news');
	};
	const redirection = e => {
		history.push(`/home/event/${match.params.id}`);
	};

	return (
		<div className="p-4">
			<div className="alert alert-warning" role="alert">
				You are going to delete the following event :{' '}
				<span className="font-italic">{stateEvent.name}</span>
			</div>
			<div>
				<button className="btn btn-outline-secondary d-inline mr-2" onClick={e => redirection(e)}>
					Go Back
				</button>
				<button className="btn btn-outline-danger d-inline ml-2" onClick={() => eventDeletion}>
					Delete Event
				</button>
			</div>
		</div>
	);
};

export default DeleteEvent;
