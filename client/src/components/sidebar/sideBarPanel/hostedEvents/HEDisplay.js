import React, { Fragment } from 'react';
import { Spring } from 'react-spring/renderprops';
import CQuery from '../../../commons/CustomQueryComponent';
import {
	GET_USER_FUTURE_HOSTED_EVENTS,
	GET_USER_PAST_HOSTED_EVENTS
} from '../../../graphql/event/Queries';
import PanelItem from '../panelItem';

export default function registrationsDisplay({ user, target }) {
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
		<CQuery query={chooseQuery(target)} variables={{ user_ID: user, date: today }}>
			{({ data }) => {
				console.log(data);
				if (data.userFutureHostedEvents && data.userFutureHostedEvents.length !== 0) {
					return (
						<Fragment>
							{data.userFutureHostedEvents.map(event => (
								<PanelItem event={event} key={event.id} />
							))}
						</Fragment>
					);
				} else if (data.userPastHostedEvents && data.userPastHostedEvents.length !== 0) {
					return (
						<Fragment>
							{data.userPastHostedEvents.map(event => (
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
