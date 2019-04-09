import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import EventMenu from './EventMenu';

const EventHeader = ({
	currentUser,
	event,
	event: {
		id,
		user_ID,
		name,
		description,
		city,
		address,
		isPublic,
		tags,
		start,
		end,
		createdAt,
		updatedAt
	},
	profile: { organisation_ID, picture_URL },
	profile,
	refetch
}) => {
	dayjs.extend(relativeTime);
	return (
		<Fragment>
			<div className="py-4 bg-darkblue text-white">
				<div className="row">
					<div className="col-md-8">
						<div className="text-center text-md-left my-2 mx-4">
							<p className="font-weight-bold text-uppercase">{name}</p>
							{/* <p className="my-1">
								{categoryOne} {categoryTwo === 'Default' ? null : `| ${categoryTwo}`}
								{categoryThree === 'Default' ? null : `| ${categoryThree}`}
							</p> */}
							<div className="d-block d-md-none">
								<div className="d-inline">
									<Link
										to={{ pathname: `/home/profile/${user_ID}` }}
										className="text-white font-weight-bold"
									>
										{profile.name}
									</Link>
								</div>
								<div className="d-inline ml-2">
									<small>{organisation_ID}</small>
								</div>
							</div>
							{new Date(start).getDate() === new Date(end).getDate() ? (
								<small>
									{new Date(start).toUTCString().slice(0, 22)} -{' '}
									{new Date(end).toTimeString().slice(0, 5)}
								</small>
							) : (
								<small>
									On {new Date(start).toUTCString().slice(0, 22)} to{' '}
									{new Date(end).toUTCString().slice(0, 22)}
								</small>
							)}
							<p className="my-1">
								{address}, {city}
							</p>
						</div>
					</div>
					<div className="d-none d-md-block col-md-4">
						<div className="d-inline align-bottom">
							{currentUser === user_ID ? (
								<EventMenu event={event} currentUser={currentUser} refetch={refetch} />
							) : null}
							<div className="d-none d-md-block my-1">
								<div className="text-right mr-4">
									<div className="d-block">
										{createdAt !== updatedAt ? (
											<small className="font-italic"> edited {dayjs(updatedAt).fromNow()} by</small>
										) : (
											<small className="font-italic"> posted {dayjs(createdAt).fromNow()} by</small>
										)}
									</div>
									<div className="d-block">
										<Link to={{ pathname: `/home/profile/${user_ID}` }} className="mr-2">
											{picture_URL ? (
												<img
													className="rounded-circle mini-avatar"
													src={picture_URL}
													alt="User Avatar"
												/>
											) : (
												<i className="fas fa-user-astronaut text-white" />
											)}
										</Link>
										<Link
											to={{ pathname: `/home/profile/${user_ID}` }}
											className="text-white font-weight-bold"
										>
											<small>{profile.name}</small>
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
