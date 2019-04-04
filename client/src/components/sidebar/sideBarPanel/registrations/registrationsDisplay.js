import React, { Fragment } from 'react';
import { Spring } from 'react-spring/renderprops';
import CQuery from '../../../commons/CustomQueryComponent';
import {
	GET_USER_FUTURE_REGISTRATIONS,
	GET_USER_PAST_REGISTRATIONS
} from '../../../graphql/registration/Queries';
import PanelItem from '../panelItem';

export default function registrationsDisplay({ user, target }) {
	const chooseQuery = target => {
		if (target === 'future') {
			return GET_USER_FUTURE_REGISTRATIONS;
		}
		if (target === 'past') {
			return GET_USER_PAST_REGISTRATIONS;
		}
	};
	const today = new Date().toISOString().slice(0, 10);
	return (
		<CQuery query={chooseQuery(target)} variables={{ user_ID: user, date: today }}>
			{({ data }) => {
				if (data.userFutureRegistrations && data.userFutureRegistrations.length !== 0) {
					return (
						<Fragment>
							{data.userFutureRegistrations.map(registration => (
								<PanelItem registration={registration} key={registration.id} />
							))}
						</Fragment>
					);
				} else if (data.userPastRegistrations && data.userPastRegistrations.length !== 0) {
					return (
						<Fragment>
							{data.userPastRegistrations.map(registration => (
								<PanelItem registration={registration} key={registration.id} />
							))}
						</Fragment>
					);
				} else {
					return (
						<Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
							{props => (
								<div style={props}>
									<small>No registrations yet</small>
								</div>
							)}
						</Spring>
					);
				}
			}}
		</CQuery>
	);
}
