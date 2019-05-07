import React from 'react';
import { Link } from 'react-router-dom';

const EventDetails = ({ event }) => {
	console.log(event);
	return (
		<div className="px-4 py-2 border-bottom">
			<div className="row align-items-center justify-content-center">
				<div className="col-7">
					<div className="text-left ">
						<Link
							to={{
								pathname: `/home/event/${event.id}`
							}}
							className="link-menu"
						>
							<small className="font-weight-bold mr-2">{event.name}</small>
						</Link>
						<small className="d-block">
							{event.address}, {event.city}
						</small>
						{new Date(event.start).getDate() === new Date(event.end).getDate() ? (
							<small>
								{new Date(event.start).toUTCString().slice(0, 22)} -{' '}
								{new Date(event.end).toTimeString().slice(0, 5)}
							</small>
						) : (
							<small>
								On {new Date(event.start).toUTCString().slice(0, 22)} to{' '}
								{new Date(event.end).toUTCString().slice(0, 22)}
							</small>
						)}
					</div>
				</div>
				<div className="col-5">
					{event.comments ? (
						<span className="text-secondary mx-2">
							<i className="far fa-comment mr-1" />
							<small className="ml-1">{event.comments.length}</small>
						</span>
					) : null}
					{event.likes ? (
						<span className="text-secondary mx-2">
							<i className="fa fa-thumbs-up  mr-1" />
							<small className="ml-1">{event.likes.length}</small>
						</span>
					) : null}
					{event.registrations ? (
						<span className="text-secondary mx-2">
							<i className="fas fa-users  mr-1" />
							<small className="ml-1">{event.registrations.length}</small>
						</span>
					) : null}
					{event.reports ? (
						<span className="text-secondary mx-2">
							<i className="far fa-flag mr-1" />
							<small className="ml-1">{event.reports.length}</small>
						</span>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default React.memo(EventDetails);
