import React, { Fragment } from 'react';
import CQuery from '../../commons/CustomQueryComponent';
import EventAbout from './EventAbout';
import EventHeader from './EventHeader';
import EventSocial from './EventSocial';

import { GET_EVENT } from '../../graphql/event/Queries';

const Event = ({ match, currentUser }) => {
	const event_ID = match.params.id;
	return (
		<CQuery query={GET_EVENT} variables={{ id: event_ID }}>
			{({ data: { event }, refetch }) => {
				const {
					creator: { profile }
				} = event;
				return (
					<Fragment key={event.id}>
						<EventHeader
							currentUser={currentUser}
							event={event}
							profile={profile}
							refetch={refetch}
						/>
						<EventAbout description={event.description} />
						<EventSocial
							currentUser={currentUser}
							event_ID={event.id}
							eventCreator={event.user_ID}
						/>
					</Fragment>
				);
			}}
		</CQuery>
	);
};

export default Event;
