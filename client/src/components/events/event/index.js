import React, { Fragment } from 'react';
import CQuery from '../../commons/CustomQueryComponent';
import EventAbout from './EventAbout';
import EventHeader from './EventHeader';
import EventSocial from './EventSocial';
import { Spring } from 'react-spring/renderprops';
import { GET_EVENT } from '../../graphql/event/Queries';
import { EventContext } from '../../contexts';

const Event = ({ match }) => {
	const event_ID = match.params.id;
	return (
		<CQuery query={GET_EVENT} variables={{ id: event_ID }}>
			{({ data: { event } }) => {
				return (
					<Fragment key={event.id}>
						<Spring from={{ opacity: 0 }} to={{ opacity: 1 }} config={{ delay: 300 }}>
							{props => (
								<div style={props}>
									<EventContext.Provider value={event}>
										<EventHeader />
										<EventAbout />
										<EventSocial />
									</EventContext.Provider>
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
