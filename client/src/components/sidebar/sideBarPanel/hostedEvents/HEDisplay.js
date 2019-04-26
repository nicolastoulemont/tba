import React, { Fragment, useContext } from 'react';
import { Spring } from 'react-spring/renderprops';
import CQuery from '../../../commons/CustomQueryComponent';
import {
	GET_USER_FUTURE_HOSTED_EVENTS,
	GET_USER_PAST_HOSTED_EVENTS
} from '../../../graphql/event/Queries';
import PanelItem from '../panelItem';
import { UserContext } from '../../../contexts';

export default function registrationsDisplay({ target }) {
	const { id } = useContext(UserContext);
	const chooseQuery = target => {
		if (target === 'future') {
			return GET_USER_FUTURE_HOSTED_EVENTS;
		}
		if (target === 'past') {
			return GET_USER_PAST_HOSTED_EVENTS;
		}
	};
	const today = new Date().toISOString().slice(0, 10);
	return (
		<CQuery query={chooseQuery(target)} variables={{ user_ID: id, date: today }}>
			{({ data }) => {
				if (data.userFutureHostedEvents && data.userFutureHostedEvents.body.length !== 0) {
					return (
						<Fragment>
							{data.userFutureHostedEvents.body.map(event => (
								<PanelItem event={event} key={event.id} />
							))}
						</Fragment>
					);
				} else if (data.userPastHostedEvents && data.userPastHostedEvents.body.length !== 0) {
					return (
						<Fragment>
							{data.userPastHostedEvents.body.map(event => (
								<PanelItem event={event} key={event.id} />
							))}
						</Fragment>
					);
				} else {
					return (
						<Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
							{props => (
								<div style={props}>
									<small>You haven't hosted an event yet</small>
								</div>
							)}
						</Spring>
					);
				}
			}}
		</CQuery>
	);
}
