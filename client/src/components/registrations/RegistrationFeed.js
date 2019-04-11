import React, { Fragment } from 'react';
import { RegisterEvent, UnRegisterEvent } from './RegistrationActions';
import CQuery from '../commons/CustomQueryComponent';
import { GET_EVENT_REGISTRATIONS_IDS } from '../graphql/registration/Queries';

const RegistrationFeed = ({ user, event }) => {
	const getUserRegistrationId = (registrations, user) => {
		let userRegistrationObj = registrations.find(registration => registration.user_ID === user);
		return userRegistrationObj;
	};

	return (
		<Fragment>
			<CQuery query={GET_EVENT_REGISTRATIONS_IDS} variables={{ id: event.id }}>
				{({
					data: {
						event: { registrations }
					},
					refetch,
					client
				}) => {
					let userRegistration = getUserRegistrationId(registrations, user);
					return (
						<Fragment>
							<div className="text-right pr-4">
								{typeof userRegistration === 'undefined' ? (
									<RegisterEvent user={user} event={event} client={client} />
								) : (
									<UnRegisterEvent
										userRegistration={userRegistration}
										refetch={refetch}
										client={client}
										event_ID={event.id}
									/>
								)}
							</div>
						</Fragment>
					);
				}}
			</CQuery>
		</Fragment>
	);
};

export default RegistrationFeed;
