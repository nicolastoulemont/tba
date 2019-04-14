import React, { Fragment } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { FetchError } from '../commons/UserActionsComponents';
import { GET_EVENT_REGISTRATIONS_IDS } from '../graphql/registration/Queries';
import { RegisterEvent, UnRegisterEvent } from './RegistrationActions';

const RegistrationFeed = ({ user, event }) => {
	const getUserRegistrationId = (registrations, user) => {
		let userRegistrationObj = registrations.find(registration => registration.user_ID === user);
		return userRegistrationObj;
	};

	const { data, error } = useQuery(GET_EVENT_REGISTRATIONS_IDS, {
		variables: { id: event.id },
		suspend: true
	});
	if (error) return <FetchError />;
	const registrations = data.event.registrations;
	const userRegistration = getUserRegistrationId(registrations, user);
	return (
		<Fragment>
			<div className="text-right pr-4">
				{typeof userRegistration === 'undefined' ? (
					<RegisterEvent user={user} event={event} />
				) : (
					<UnRegisterEvent userRegistration={userRegistration} event_ID={event.id} />
				)}
			</div>
		</Fragment>
	);
};

export default RegistrationFeed;
