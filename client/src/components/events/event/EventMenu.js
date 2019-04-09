import React from 'react';
import { Link } from 'react-router-dom';

export default function EventMenu({ event, event: { id } }) {
	return (
		<div>
			<div className="text-right mt-0 mr-2">
				<Link
					className="far fa-edit text-white"
					to={{ pathname: `/home/event/edit/${id}`, state: { event: event } }}
				/>
				<Link
					className="fa fa-times mx-2 text-white"
					to={{ pathname: `/home/event/delete/${id}`, state: { event: event } }}
				/>
			</div>
		</div>
	);
}
