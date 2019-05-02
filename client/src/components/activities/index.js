import React, { Fragment, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import dayjs from 'dayjs';
import FeedSearch from '../commons/FeedSearch';
import { DateUrlValidation } from '../commons/DateUrlValidation';
import { Spring } from 'react-spring/renderprops';
import { useStateValue } from '../contexts/InitialState';
import { UserContext } from '../contexts';
import { SEARCH_USER_EVENTS } from '../graphql/event/Queries';
import { SEARCH_USER_REGISTRATIONS } from '../graphql/registration/Queries';
import CQuery from '../commons/CustomQueryComponent';
import PanelItem from '../commons/PanelItem';

const ManageActivities = ({ match }) => {
	const user = useContext(UserContext);
	const [displayRegistrations, setDisplayRegistrations] = useState(true);
	const [{ userSearchPref }] = useStateValue();
	const [search, setSearch] = useState('');
	const [sort, setSort] = useState(userSearchPref.sort);

	const day = match.params.day;

	const displayDay = () => {
		if (!day.includes('+')) {
			const date = `Your ${displayRegistrations ? `Registrations` : `Events`} on ${dayjs(
				day
			).format('dddd')} `;
			return date;
		}
		if (day.includes('+')) {
			const firstDay = day.split('+')[0];
			const lastDay = day.split('+')[1];
			const days = `Your ${displayRegistrations ? `Registrations` : `Events`} from ${dayjs(
				firstDay
			).format('dddd')}, ${dayjs(firstDay).format('DD')} to ${dayjs(lastDay).format(
				'dddd'
			)}, ${dayjs(lastDay).format('DD')}`;
			return days;
		}
	};
	if (!DateUrlValidation(day))
		return <Redirect to={`/home/activities/${dayjs().format('YYYY-MM-DD')}`} />;

	const chooseQuery = () => {
		if (displayRegistrations) return SEARCH_USER_REGISTRATIONS;
		if (!displayRegistrations) return SEARCH_USER_EVENTS;
	};

	return (
		<div className="row m-0 px-2">
			<div className="w-100 mt-2 mb-4 pb-4">
				<FeedSearch
					date={displayDay()}
					setSearch={setSearch}
					sort={sort}
					setSort={setSort}
					displayRegistrations={displayRegistrations}
					setDisplayRegistrations={setDisplayRegistrations}
				/>
				<div className="border-top">
					<CQuery
						query={chooseQuery()}
						variables={{
							user_ID: user.id,
							date: day,
							search,
							limit: 10,
							sort
						}}
					>
						{({ data }) => {
							if (data.searchUserEvents) {
								return (
									<Fragment>
										{data.searchUserEvents.body.length === 0 ? (
											<div className="mt-4 pl-4 font-italic ">No {displayDay()}</div>
										) : (
											<Fragment>
												{data.searchUserEvents.body.map(event => (
													<Spring from={{ opacity: 0 }} to={{ opacity: 1 }} key={event.id}>
														{props => (
															<div style={props}>
																<PanelItem event={event} key={event.id} />
															</div>
														)}
													</Spring>
												))}
											</Fragment>
										)}
									</Fragment>
								);
							} else if (data.searchUserRegistrations) {
								return (
									<Fragment>
										{data.searchUserRegistrations.body.length === 0 ? (
											<div className="mt-4 pl-4 font-italic ">No {displayDay()}</div>
										) : (
											<Fragment>
												{data.searchUserRegistrations.body.map(registration => (
													<Spring from={{ opacity: 0 }} to={{ opacity: 1 }} key={registration.id}>
														{props => (
															<div style={props}>
																<PanelItem registration={registration} key={registration.id} />
															</div>
														)}
													</Spring>
												))}
											</Fragment>
										)}
									</Fragment>
								);
							}
							return <p>No Registrations or Events to manage</p>;
						}}
					</CQuery>
				</div>
			</div>
		</div>
	);
};

export default ManageActivities;
