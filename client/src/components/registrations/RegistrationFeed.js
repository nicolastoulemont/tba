import React, { Fragment, useContext } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { FetchError } from '../commons/UserActionsComponents';
import { EventContext, UserContext } from '../contexts';
import { GET_EVENT_REGISTRATIONS_IDS } from '../graphql/registration/Queries';
import { RegisterEvent, UnRegisterEvent } from './RegistrationActions';

const RegistrationFeed = () => {
	const user = useContext(UserContext);
	const event = useContext(EventContext);

	const getUserRegistrationId = registrations => {
		let userRegistrationObj = registrations.find(registration => registration.user_ID === user.id);
		return userRegistrationObj;
	};

	const { data, error } = useQuery(GET_EVENT_REGISTRATIONS_IDS, {
		variables: { id: event.id },
		suspend: true
	});
	if (error) return <FetchError />;
	const registrations = data.event.registrations;
	const userRegistration = getUserRegistrationId(registrations);
	return (
		<Fragment>
			<div className="text-right pr-4">
				{typeof userRegistration === 'undefined' ? (
					<RegisterEvent />
				) : (
					<UnRegisterEvent userRegistration={userRegistration} />
				)}
			</div>
		</Fragment>
	);
};

export default RegistrationFeed;
