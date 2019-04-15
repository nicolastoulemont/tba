import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import PlaceholderBanner from '../../../img/ep_placeholder_banner.svg';
import { EventContext, UserContext } from '../../contexts';
import EventMenu from './EventMenu';
const EventHeader = () => {
	const { id } = useContext(UserContext);
	const event = useContext(EventContext);
	dayjs.extend(relativeTime);
	return (
		<Fragment>
			<div className="px-3">
				<div className="row">
					{event.banner_URL ? (
						<img src={event.banner_URL} alt="Event Banner" />
					) : (
						<img src={PlaceholderBanner} alt="Default Event Banner" />
					)}
				</div>
				<div className="row p-1">
					<div className="col-md-10">
						<div className="text-center text-md-left my-2">
							<div className="title">
								<h4 className="font-weight-bold text-uppercase">{event.name}</h4>
								<Link
									to={{ pathname: `/home/profile/${event.user_ID}` }}
									className="font-weight-bold d-inline"
								>
									{event.creator.profile.name}
								</Link>
								{event.createdAt !== event.updatedAt ? (
									<small className="font-italic d-inline">
										{' '}
										edited {dayjs(event.updatedAt).fromNow()}
									</small>
								) : (
									<small className="font-italic d-inline">
										{' '}
										{dayjs(event.createdAt).fromNow()}
									</small>
								)}
							</div>
							<div className="d-block d-md-none">
								<div className="d-inline">
									<Link
										to={{ pathname: `/home/profile/${event.user_ID}` }}
										className="font-weight-bold"
									>
										{event.creator.profile.name}
									</Link>
								</div>
								<div className="d-inline ml-2">
									<small>{event.creator.profile.organisation_ID}</small>
								</div>
							</div>
							<p className="my-1">
								{event.address}, {event.city}
							</p>
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
							<div className="d-none d-md-block my-1">
								<div className="text-left mr-4">
									<div className="d-inline" />
								</div>
							</div>
						</div>
					</div>
					<div className="d-none d-md-block col-md-2">
						<div className="d-inline align-bottom">
							{id === event.user_ID ? <EventMenu /> : null}
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default EventHeader;
