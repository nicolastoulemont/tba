import React, { Fragment } from 'react';
import CQuery from '../../commons/CustomQueryComponent';
import EventAbout from './EventAbout';
import EventHeader from './EventHeader';
import EventSocial from './EventSocial';

import { GET_EVENT } from '../../graphql/event/Queries';

const Event = ({ user, event_ID, history }) => {
	return (
		<CQuery query={GET_EVENT} variables={{ id: event_ID }}>
			{({ data: { event }, refetch }) => {
				const {
					creator,
					creator: { profile }
				} = event;
				return (
					<Fragment key={event.id}>
						<EventHeader
							user_ID={event.user_ID}
							userAvatar={creator.avatar}
							loggedUser={user}
							history={history}
							refetch={refetch}
							event_ID={event.id}
							name={event.name}
							description={event.description}
							location={event.location}
							ispublic={event.ispublic}
							userName={profile.name}
							userPosition={profile.position}
							userOrganisation={profile.organisation}
							categoryOne={event.categoryOne}
							categoryTwo={event.categoryTwo}
							categoryThree={event.categoryThree}
							start={event.start}
							end={event.end}
						/>
						<EventAbout description={event.description} />
						<EventSocial
							user={user}
							event_ID={event.id}
							eventCreator={event.user_ID}
							createdAt={event.createdAt}
							updatedAt={event.updatedAt}
						/>
					</Fragment>
				);
			}}
		</CQuery>
	);
};

export default Event;
