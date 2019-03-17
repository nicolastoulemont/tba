import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import EventMenu from './EventMenu';

const EventHeader = ({
	userId,
	loggedUser,
	history,
	refetch,
	eventId,
	name,
	description,
	location,
	ispublic,
	userAvatar,
	userName,
	userPosition,
	userOrganisation,
	categoryOne,
	categoryTwo,
	categoryThree,
	start,
	end
}) => {
	return (
		<Fragment>
			<div className="py-4 bg-darkblue text-white">
				<div className="row">
					<div className="col-md-8">
						<div className="text-center text-md-left my-2 mx-4">
							<p className="font-weight-bold text-uppercase">{name}</p>
							<p className="my-1">
								{categoryOne} {categoryTwo === 'Default' ? null : `| ${categoryTwo}`}
								{categoryThree === 'Default' ? null : `| ${categoryThree}`}
							</p>
							<div className="d-block d-md-none">
								<div className="d-inline">
									<Link
										to={{ pathname: `/profile/${userId}` }}
										className="text-white font-weight-bold"
									>
										{userName}
									</Link>
								</div>
								<div className="d-inline ml-2">
									<small>{userOrganisation}</small>
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
							<p className="my-1">{location}</p>
						</div>
					</div>
					<div className="d-none- col-md-4">
						{loggedUser === userId ? (
							<EventMenu
								ispublic={ispublic}
								eventId={eventId}
								name={name}
								categoryOne={categoryOne}
								categoryTwo={categoryTwo}
								categoryThree={categoryThree}
								start={start}
								end={end}
								description={description}
								location={location}
								eventCreator={userId}
								loggedUser={loggedUser}
								history={history}
								refetch={refetch}
							/>
						) : null}
						<div className="d-none d-md-block my-1">
							<div className="row">
								<div className="col-md-1 mr-4">
									<Link to={{ pathname: `/profile/${userId}` }}>
										{userAvatar ? (
											<img
												className="rounded-circle border-avatar small-avatar"
												src={userAvatar}
												alt="User Avatar"
											/>
										) : (
											<i className="fas fa-user-astronaut text-white fa-2x" />
										)}
									</Link>
								</div>
								<div className="col-md-9">
									<div className="text-left">
										<div className="d-block">
											<Link
												to={{ pathname: `/profile/${userId}` }}
												className="text-white font-weight-bold"
											>
												{userName}
											</Link>
										</div>
										<div className="d-block">
											<small>
												{userPosition} at {userOrganisation}
											</small>
										</div>
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
