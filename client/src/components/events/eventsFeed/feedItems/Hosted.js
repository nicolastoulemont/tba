import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import DefaultAvatar from '../../../../img/default_avatar.svg';
import { UserContext } from '../../../contexts';

const HostedItem = ({ event }) => {
	const user = useContext(UserContext);
	dayjs.extend(relativeTime);
	return (
		<div className="media my-2  border-bottom">
			<Link to={`/home/profile/${event.user_ID}`}>
				{event.creator[0].profile[0].picture_URL ? (
					<img
						src={event.creator[0].profile[0].picture_URL}
						className="small-avatar rounded-circle mr-2"
						alt="User Avatar"
					/>
				) : (
					<img src={DefaultAvatar} className="small-avatar rounded-circle mr-2" alt="User Avatar" />
				)}
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
				<h6 className="text-left text-muted mb-0">Host: {event.eventHost}</h6>
				<p className="text-left p-0 my-1">
					{event.tags.map(tag => (
						<span
							className="badge tag"
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
					{' '}
					<small>
						{event.address}, {event.city}
					</small>
				</p>
				<p className="text-left mb-0">
					{new Date(event.start).getDate() === new Date(event.end).getDate() ? (
						<small>
							{dayjs(event.start).format('dddd DD')} from {dayjs(event.start).format('HH:mm')} to{' '}
							{dayjs(event.end).format('HH:mm')}
						</small>
					) : (
						<small>
							From {dayjs(event.start).format('dddd DD HH:mm')} to{' '}
							{dayjs(event.end).format('dddd DD HH:mm')}
						</small>
					)}
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
							{event.creator[0].profile[0].name}
						</Link>
					</small>
				</p>
				{user.profile[0] ? (
					<Link
						to="#"
						data-togggle="tooltip"
						data-placement="bottom"
						title="Report this event"
						className="float-right"
					>
						<small>
							{' '}
							<i className="far fa-flag mx-2" />
						</small>
					</Link>
				) : null}
			</div>
		</div>
	);
};

export default HostedItem;
