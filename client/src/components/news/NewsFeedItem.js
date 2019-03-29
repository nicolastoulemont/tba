import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const NewsFeedItem = ({ currentUser, event }) => {
	dayjs.extend(relativeTime);
	return (
		<div className="media my-2 border-bottom">
			<Link to={`/home/profile/${event.user_ID}`}>
				<img
					src={event.creator.profile.picture_URL}
					className="small-avatar rounded-circle mr-3"
					alt="Avatar"
				/>
			</Link>
			<div className="media-body">
				<Link to={`/home/event/${event.id}`}>
					{' '}
					<h6 className="text-left mb-0">
						{event.name} -{' '}
						{event.createdAt !== event.updatedAt ? (
							<small className="font-italic">
								{dayjs(event.updatedAt).fromNow()} <small>edited</small>{' '}
							</small>
						) : (
							<small className="font-italic">{dayjs(event.createdAt).fromNow()}</small>
						)}
					</h6>
				</Link>
				<p className="text-left p-0 mt-0">
					<small>
						{event.categoryOne} {event.categoryTwo === 'Default' ? null : ` | ${event.categoryTwo}`}
						{event.categoryThree === 'Default' ? null : ` | ${event.categoryThree}`}
						{event.isPublic ? <span className="ml-2 font-italic">- Public event</span> : null}
					</small>
				</p>
				<p className="text-left">{event.abstract}</p>
			</div>
		</div>
	);
};

export default NewsFeedItem;
