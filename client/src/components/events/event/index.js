import React, { Fragment } from 'react';
import CQuery from '../../commons/CustomQueryComponent';
import EventAbout from './EventAbout';
import EventHeader from './EventHeader';
import EventSocial from './EventSocial';
import { Spring } from 'react-spring/renderprops';

import { GET_EVENT } from '../../graphql/event/Queries';

const Event = ({ match, user }) => {
	const event_ID = match.params.id;
	return (
		<CQuery query={GET_EVENT} variables={{ id: event_ID }}>
			{({ data: { event }, refetch }) => {
				const {
					creator: { profile }
				} = event;
				return (
					<Fragment key={event.id}>
						<Spring from={{ opacity: 0 }} to={{ opacity: 1 }} config={{ delay: 300 }}>
							{props => (
								<div style={props}>
									<EventHeader
										currentUser={user.id}
										event={event}
										profile={profile}
										refetch={refetch}
									/>
									<EventAbout description={event.description} />
									<EventSocial currentUser={user.id} event={event} />
								</div>
							)}
						</Spring>
					</Fragment>
				);
			}}
		</CQuery>
	);
};

export default Event;
