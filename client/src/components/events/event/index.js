import React, { Fragment } from 'react';
import { Spring } from 'react-spring/renderprops';
import CQuery from '../../commons/CustomQueryComponent';
import { EventContext } from '../../contexts';
import { GET_EVENT } from '../../graphql/event/Queries';
import EventAbout from './EventAbout';
import EventHeader from './EventHeader';
import EventSocial from './EventSocial';

const Event = ({ match }) => {
	return (
		<Fragment>
			<CQuery query={GET_EVENT} variables={{ id: match.params.id }}>
				{({ data }) => {
					console.log(data);
					return (
						<Fragment>
							{data.event.statusCode === 200 ? (
								<Spring from={{ opacity: 0 }} to={{ opacity: 1 }} config={{ delay: 300 }}>
									{props => (
										<div style={props}>
											<EventContext.Provider value={data.event.body}>
												<EventHeader />
												<EventAbout />
												<EventSocial />
											</EventContext.Provider>
										</div>
									)}
								</Spring>
							) : null}
						</Fragment>
					);
				}}
			</CQuery>
		</Fragment>
	);
};

export default Event;
