import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { EventContext, UserContext } from '../../contexts';
import EventMenu from './EventMenu';

const EventHeader = () => {
	const { id } = useContext(UserContext);
	const event = useContext(EventContext);
	dayjs.extend(relativeTime);
	return (
		<Fragment>
			<div className="py-4 bg-darkblue text-white">
				<div className="row">
					<div className="col-md-8">
						<div className="text-center text-md-left my-2 mx-4">
							<p className="font-weight-bold text-uppercase">{event.name}</p>
							<div className="d-block d-md-none">
								<div className="d-inline">
									<Link
										to={{ pathname: `/home/profile/${event.user_ID}` }}
										className="text-white font-weight-bold"
									>
										{event.creator.profile.name}
									</Link>
								</div>
								<div className="d-inline ml-2">
									<small>{event.creator.profile.organisation_ID}</small>
								</div>
							</div>
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
							<p className="my-1">
								{event.address}, {event.city}
							</p>
						</div>
					</div>
					<div className="d-none d-md-block col-md-4">
						<div className="d-inline align-bottom">
							{id === event.user_ID ? <EventMenu /> : null}
							<div className="d-none d-md-block my-1">
								<div className="text-right mr-4">
									<div className="d-block">
										{event.createdAt !== event.updatedAt ? (
											<small className="font-italic">
												{' '}
												edited {dayjs(event.updatedAt).fromNow()} by
											</small>
										) : (
											<small className="font-italic">
												{' '}
												posted {dayjs(event.createdAt).fromNow()} by
											</small>
										)}
									</div>
									<div className="d-block">
										<Link to={{ pathname: `/home/profile/${event.user_ID}` }} className="mr-2">
											{event.creator.profile.picture_URL ? (
												<img
													className="rounded-circle mini-avatar"
													src={event.creator.profile.picture_URL}
													alt="User Avatar"
												/>
											) : (
												<i className="fas fa-user-astronaut text-white" />
											)}
										</Link>
										<Link
											to={{ pathname: `/home/profile/${event.user_ID}` }}
											className="text-white font-weight-bold"
										>
											<small>{event.creator.profile.name}</small>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default EventHeader;
