import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { EventContext } from '../../contexts';
import { useStateValue } from '../../contexts/InitialState';

export default function EventMenu() {
	const event = useContext(EventContext);
	const [{ stateEvent }, dispatch] = useStateValue();
	return (
		<div>
			<div className="text-right mt-0 mr-2">
				<Link
					className="far fa-edit"
					to={{ pathname: `/home/event/edit/${event.id}`, state: { event: stateEvent } }}
					onClick={() =>
						dispatch({
							type: 'ADD_EVENT',
							newEvent: event
						})
					}
				/>
				<Link
					className="fa fa-times mx-2"
					to={{ pathname: `/home/event/delete/${event.id}`, state: { event: stateEvent } }}
					onClick={() =>
						dispatch({
							type: 'ADD_EVENT',
							newEvent: event
						})
					}
				/>
			</div>
		</div>
	);
}
