import React, { Fragment } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { RespSmallAvatarLink, UserNameLink } from '../commons/CustomLinks';
import { FetchError } from '../commons/UserActionsComponents';
import { GET_EVENT_REGISTRATIONS } from '../graphql/registration/Queries';

const EventRegistrationFeed = ({ event_ID }) => {
	const { data, error } = useQuery(GET_EVENT_REGISTRATIONS, {
		variables: { id: event_ID },
		suspend: true
	});
	if (error) return <FetchError />;
	const registrations = data.event.registrations;
	if (registrations.length === 0) {
		return <div className="font-italic">No participant yet</div>;
	}
	return (
		<Fragment>
			{registrations.map(registration => (
				<div className="list-group-item border-0 py-1 px-4" key={registration.id}>
					<div className="row">
						<div className="col-1 px-0">
							<RespSmallAvatarLink
								id={registration.user_ID}
								avatar={registration.creator.profile.picture_URL}
							/>
						</div>
						<div className="col-10 mx-0 pr-0 pl-1">
							<div className="text-left mx-auto">
								<div className="block">
									<UserNameLink
										id={registration.user_ID}
										name={registration.creator.profile.name}
									/>
								</div>
								<div className="d-none d-md-block">
									{registration.creator.profile.position} at{' '}
									{registration.creator.profile.organisation_ID}
								</div>
								<div className="d-block d-md-none ml-4">
									{registration.creator.profile.position} at{' '}
									{registration.creator.profile.organisation_ID}
								</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</Fragment>
	);
};

export default EventRegistrationFeed;
