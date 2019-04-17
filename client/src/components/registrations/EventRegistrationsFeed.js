import React, { Fragment, useContext } from 'react';
import { RespSmallAvatarLink, UserNameLink } from '../commons/CustomLinks';
import CQuery from '../commons/CustomQueryComponent';
import { EventContext } from '../contexts';
import { GET_EVENT_REGISTRATIONS } from '../graphql/registration/Queries';

const EventRegistrationFeed = () => {
	const event = useContext(EventContext);
	return (
		<Fragment>
			<CQuery query={GET_EVENT_REGISTRATIONS} variables={{ id: event.id }}>
				{({ data }) => {
					if (data.event.registrations === 0)
						return <div className="font-italic">No participant yet</div>;
					return (
						<Fragment>
							{data.event.registrations.map(registration => (
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
				}}
			</CQuery>
		</Fragment>
	);
};

export default EventRegistrationFeed;
