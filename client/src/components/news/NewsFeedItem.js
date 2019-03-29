import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Spring } from 'react-spring/renderprops';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const NewsFeedItem = ({ currentUser, event }) => {
	const [display, setDisplay] = useState(false);
	const [signedIn, setSignedIn] = useState(false);
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
				<p className="text-left p-0 mt-0 mb-1">
					<small>
						{event.categoryOne} {event.categoryTwo === 'Default' ? null : ` | ${event.categoryTwo}`}
						{event.categoryThree === 'Default' ? null : ` | ${event.categoryThree}`}
						{event.isPublic ? <span className="ml-2 mb-0 font-italic">- Public event</span> : null}
					</small>
				</p>
				<p className="text-left">{event.abstract}</p>
				<p className="text-left p-0 mb-2">
					<small className="d-block">
						<Link
							to="#"
							data-togggle="tooltip"
							data-placement="bottom"
							title="Sign in to this event"
						>
							<i className="fas fa-sign-in-alt mx-2" />
						</Link>
						{display ? (
							<Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
								{props => (
									<span style={props}>
										<Link
											to="#"
											data-togggle="tooltip"
											data-placement="bottom"
											title="Report this event"
										>
											<i className="fas fa-flag mx-2" />
										</Link>
										<Link
											to="#"
											data-togggle="tooltip"
											data-placement="bottom"
											title="Hide"
											onClick={() => setDisplay(!display)}
										>
											<i className="fas fa-chevron-left mx-2" />
										</Link>
									</span>
								)}
							</Spring>
						) : (
							<Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
								{props => (
									<span style={props}>
										<Link
											to="#"
											data-togggle="tooltip"
											data-placement="bottom"
											title="See more"
											onClick={() => setDisplay(!display)}
										>
											<i className="fas fa-chevron-right mx-2" />
										</Link>
									</span>
								)}
							</Spring>
						)}
					</small>
				</p>
			</div>
		</div>
	);
};

export default NewsFeedItem;
