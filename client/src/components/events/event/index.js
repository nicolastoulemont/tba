import React, { Fragment } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { Spring } from 'react-spring/renderprops';
import { FetchError } from '../../commons/UserActionsComponents';
import { EventContext } from '../../contexts';
import { GET_EVENT } from '../../graphql/event/Queries';
import EventAbout from './EventAbout';
import EventHeader from './EventHeader';
import EventSocial from './EventSocial';

const Event = ({ match }) => {
	const { data, error } = useQuery(GET_EVENT, {
		variables: { id: match.params.id },
		suspend: true
	});
	if (error) return <FetchError />;
	return (
		<Fragment key={data.event.id}>
			<Spring from={{ opacity: 0 }} to={{ opacity: 1 }} config={{ delay: 300 }}>
				{props => (
					<div style={props}>
						<EventContext.Provider value={data.event}>
							<EventHeader />
							<EventAbout />
							<EventSocial />
						</EventContext.Provider>
					</div>
				)}
			</Spring>
		</Fragment>
	);
};

export default Event;
