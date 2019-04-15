import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { EventContext } from '../../contexts';
export default function EventMenu() {
	const event = useContext(EventContext);
	return (
		<div>
			<div className="text-right mt-0 mr-2">
				<Link
					className="far fa-edit"
					to={{ pathname: `/home/event/edit/${event.id}`, state: { event: event } }}
				/>
				<Link
					className="fa fa-times mx-2"
					to={{ pathname: `/home/event/delete/${event.id}`, state: { event: event } }}
				/>
			</div>
		</div>
	);
}
