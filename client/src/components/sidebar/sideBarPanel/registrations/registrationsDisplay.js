import React, { Fragment, useContext } from 'react';
import { Spring } from 'react-spring/renderprops';
import CQuery from '../../../commons/CustomQueryComponent';
import { UserContext } from '../../../contexts';
import {
	GET_USER_FUTURE_REGISTRATIONS,
	GET_USER_PAST_REGISTRATIONS
} from '../../../graphql/registration/Queries';
import PanelItem from '../../../commons/PanelItem';

export default function registrationsDisplay({ target }) {
	const user = useContext(UserContext);
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
		<div className="border-top">
			<CQuery query={chooseQuery(target)} variables={{ user_ID: user.id, date: today }}>
				{({ data }) => {
					if (data.userFutureRegistrations && data.userFutureRegistrations.body.length !== 0) {
						return (
							<Fragment>
								{data.userFutureRegistrations.body.map(registration => (
									<PanelItem registration={registration} key={registration.id} />
								))}
							</Fragment>
						);
					} else if (data.userPastRegistrations && data.userPastRegistrations.body.length !== 0) {
						return (
							<Fragment>
								{data.userPastRegistrations.body.map(registration => (
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
		</div>
	);
}
