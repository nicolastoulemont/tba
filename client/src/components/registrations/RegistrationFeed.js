import React, { Fragment, useContext } from 'react';
import CQuery from '../commons/CustomQueryComponent';
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

	return (
		<div className="float-right pr-2">
			<CQuery query={GET_EVENT_REGISTRATIONS_IDS} variables={{ id: event.id }}>
				{({ data }) => {
					const registrations = data.event.registrations;
					const userRegistration = getUserRegistrationId(registrations);
					return (
						<Fragment>
							{typeof userRegistration === 'undefined' ? (
								<RegisterEvent />
							) : (
								<UnRegisterEvent userRegistration={userRegistration} />
							)}
						</Fragment>
					);
				}}
			</CQuery>
		</div>
	);
};

export default RegistrationFeed;
