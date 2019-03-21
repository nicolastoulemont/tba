import React from 'react';
import { Link } from 'react-router-dom';

const EventFeedItem = ({ event_ID, user_ID, name, creator, start, end, location, abstract }) => {
	return (
		<div className="p-2 border-top border-bottom" key={event_ID}>
			<div className="row">
				<div className="d-none d-md-block col-md-1">
					<Link to={{ pathname: `/profile/${user_ID}` }}>
						{creator.avatar ? (
							<img
								className="rounded-circle small-avatar mt-2"
								src={creator.avatar}
								alt="User Avatar"
							/>
						) : (
							<i className="fas fa-user-astronaut fa-3x" />
						)}
					</Link>
				</div>
				<div className="col-md-11">
					<div className="d-flex w-100 justify-content-between mt-2">
						<h6 className="font-weight-bold mt-0">
							<Link
								to={{
									pathname: `/event/${event_ID}`
								}}
							>
								{name}
							</Link>
						</h6>
					</div>
					<div className="d-flex w-100 justify-content-between mb-2">{abstract}</div>
					<div className="d-flex w-100 justify-content-between">
						<div>
							{new Date(start).getDate() === new Date(end).getDate() ? (
								<small>
									From {new Date(start).toTimeString().slice(0, 5)} to{' '}
									{new Date(end).toTimeString().slice(0, 5)}
								</small>
							) : (
								<small>
									On {new Date(start).toUTCString().slice(0, 22)} to{' '}
									{new Date(end).toUTCString().slice(0, 22)}
								</small>
							)}
							<small> at {location}</small>
						</div>
					</div>
					<div className="d-flex w-100 justify-content-between">
						<small>
							by{' '}
							<Link to={{ pathname: `/profile/${user_ID}` }} className="font-weight-bold">
								{creator.profile.name}
							</Link>
							, {creator.profile.position} at {creator.profile.organisation}
						</small>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EventFeedItem;
