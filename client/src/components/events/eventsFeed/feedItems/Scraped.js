import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';

const ScrapedItem = ({ event }) => {
	dayjs.extend(relativeTime);
	return (
		<div className="media my-2 border-bottom">
			<a href={event.author_URL} target="#">
				<img
					src={event.authorPicture_URL}
					className="small-avatar rounded-circle mr-2"
					alt="Author Logo"
				/>
			</a>
			<div className="media-body">
				<h6 className="text-left mb-0">
					<a href={event.eventOrigin_URL} target="#">
						{event.name} -
					</a>
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
				<p className="text-left text-muted mb-0">
					<small>
						<a className="font-weight-bold" href={event.author_URL} target="#">
							{event.authorName}
						</a>
					</small>
				</p>
				<p className="text-left p-0 mt-0 mb-1">
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
			</div>
		</div>
	);
};

export default ScrapedItem;
