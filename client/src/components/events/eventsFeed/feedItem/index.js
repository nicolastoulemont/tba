import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export default function EventFeedIitem({ currentUser, event }) {
	dayjs.extend(relativeTime);
	return (
		<div className="media my-2 px-2 border-bottom">
			<Link to={`/home/profile/${event.user_ID}`}>
				<img
					src={event.creator.profile.picture_URL}
					className="small-avatar rounded-circle mr-3"
					alt="User Avatar"
				/>
			</Link>
			<div className="media-body">
				<h6 className="text-left mb-0">
					<Link to={`/home/event/${event.id}`}> {event.name} </Link> -{' '}
					{event.createdAt !== event.updatedAt ? (
						<small className="font-italic">
							{dayjs(event.updatedAt).fromNow()} <small>edited</small>{' '}
						</small>
					) : (
						<small className="font-italic">{dayjs(event.createdAt).fromNow()}</small>
					)}
				</h6>

				<p className="text-left p-0 mt-0 mb-1">
					<small>
						{/* {event.categoryOne} {event.categoryTwo === 'Default' ? null : ` | ${event.categoryTwo}`}
          {event.categoryThree === 'Default' ? null : ` | ${event.categoryThree}`} */}
						{event.isPublic ? <span className="mb-0 font-italic">Public event</span> : null}
					</small>
				</p>
				<p className="text-left">{event.abstract}</p>
				<p className="text-left mb-0">
					{new Date(event.start).getDate() === new Date(event.end).getDate() ? (
						<small>
							From {new Date(event.start).toTimeString().slice(0, 5)} to{' '}
							{new Date(event.end).toTimeString().slice(0, 5)}
						</small>
					) : (
						<small>
							On {new Date(event.start).toUTCString().slice(0, 22)} to{' '}
							{new Date(event.end).toUTCString().slice(0, 22)}
						</small>
					)}
					<small> at {event.location}</small>
				</p>
				<p className="float-left">
					<small>
						by{' '}
						<Link to={{ pathname: `/home/profile/${event.user_ID}` }} className="font-weight-bold">
							{event.creator.profile.name}
						</Link>
					</small>
				</p>
				<p className="float-right ">
					<small className="d-block">
						<Link
							to="#"
							data-togggle="tooltip"
							data-placement="bottom"
							title="Read the full article"
						>
							<i className="fas fa-external-link-alt mx-2" />
						</Link>
						<Link
							to="#"
							data-togggle="tooltip"
							data-placement="bottom"
							title="Report this news piece"
						>
							<i className="far fa-flag mx-2" />
						</Link>
					</small>
				</p>
			</div>
		</div>
	);
}
