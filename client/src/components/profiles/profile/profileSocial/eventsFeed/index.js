import React, { Fragment, useContext } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { Link } from 'react-router-dom';
import { FetchError } from '../../../../commons/UserActionsComponents';
import { ProfileContext } from '../../../../contexts';
import { GET_USER_EVENTS } from '../../../../graphql/user/Queries';

const ProfileEventsFeed = () => {
	const profile = useContext(ProfileContext);
	const { data, error } = useQuery(GET_USER_EVENTS, {
		variables: { id: profile.user_ID },
		suspend: true
	});
	if (error) return <FetchError />;
	const events = data.user.events;
	if (events.length === 0)
		return (
			<div className="text-left px-3 py-2 border-top">
				<small>{profile.name} did not attend an event yet</small>
			</div>
		);
	return (
		<Fragment>
			{events.map(event => (
				<div className="text-left px-3 py-2 border-top" key={event.id}>
					<div>
						<Link
							to={{
								pathname: `/home/event/${event.id}`
							}}
							className="d-block"
						>
							<small className="font-weight-bold mr-2">{event.name}</small>
						</Link>
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
						<small className="d-block">
							{event.address}, {event.city}
						</small>
					</div>
				</div>
			))}
		</Fragment>
	);
};

export default ProfileEventsFeed;
