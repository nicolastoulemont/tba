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
							user_ID={event.user_ID}
							userAvatar={profile.picture_URL}
							currentUser={currentUser}
							refetch={refetch}
							event_ID={event.id}
							name={event.name}
							description={event.description}
							location={event.location}
							ispublic={event.isPublic}
							userName={profile.name}
							userPosition={profile.position}
							userOrganisation={profile.organisation_ID}
							categoryOne={event.categoryOne}
							categoryTwo={event.categoryTwo}
							categoryThree={event.categoryThree}
							start={event.start}
							end={event.end}
							createdAt={event.createdAt}
							updatedAt={event.updatedAt}
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
