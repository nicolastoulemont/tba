import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { Link } from 'react-router-dom';

export default function EventFeedIitem({ event }) {
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
					{event.type === 'institutional' ? (
						<i
							data-togggle="tooltip"
							data-placement="bottom"
							title="Institutional Event"
							className="fas fa-university mx-2"
						/>
					) : null}
					{event.createdAt !== event.updatedAt ? (
						<small className="font-italic">edited {dayjs(event.updatedAt).fromNow()}</small>
					) : (
						<small className="font-italic">{dayjs(event.createdAt).fromNow()}</small>
					)}
				</h6>

				<p className="text-left p-0 my-1">
					{event.tags.map(tag => (
						<span
							className="badge badge-pill border-grey m-1"
							key={Math.random()
								.toString(36)
								.substring(2, 7)}
						>
							{tag}
						</span>
					))}
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
					<small> at {event.city}</small>
				</p>
				<p className="text-left mb-0">
					<small>
						{event.isPublic ? <span className="mb-0 font-italic">Public event</span> : null}{' '}
						{event.price === 0 ? (
							<span className="font-italic"> - Free Event</span>
						) : (
							<span className="font-italic"> - Entrance Fee : {event.price} €</span>
						)}
					</small>
				</p>
				<p className="float-left">
					<small>
						by{' '}
						<Link to={{ pathname: `/home/profile/${event.user_ID}` }} className="font-weight-bold">
							{event.creator.profile.name}
						</Link>
					</small>
				</p>
				<Link
					className="float-right"
					to="#"
					data-togggle="tooltip"
					data-placement="bottom"
					title="Read the full article"
				>
					<small>
						<i className="fas fa-external-link-alt mx-2" />
					</small>
				</Link>
				<Link
					to="#"
					data-togggle="tooltip"
					data-placement="bottom"
					title="Report this news piece"
					className="float-right"
				>
					<small>
						{' '}
						<i className="far fa-flag mx-2" />
					</small>
				</Link>
			</div>
		</div>
	);
}
