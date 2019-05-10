import dayjs from 'dayjs';
import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Spring } from 'react-spring/renderprops';
import { DateUrlValidation } from '../../commons/DateUrlValidation';
import CQuery from '../../commons/CustomQueryComponent';
import FeedSearch from '../../commons/FeedSearch';
import { useStateValue } from '../../contexts/InitialState';
import { SEARCH_DAILY_EVENTS } from '../../graphql/event/Queries';
import EventFeedItem from './feedItems';

const EventFeed = ({ match }) => {
	const [{ userSearchPref }] = useStateValue();
	const [search, setSearch] = useState('');
	const [sort, setSort] = useState(userSearchPref.sort);
	const [type, setType] = useState(userSearchPref.type);
	const [price, setPrice] = useState(userSearchPref.price);
	const [tags, setTags] = useState(userSearchPref.tags);
	const [errors, setErrors] = useState([]);

	const day = match.params.day;

	const displayDay = () => {
		if (!day.includes('+')) {
			const date = `Events on ${dayjs(day).format('dddd')} `;
			return date;
		}
		if (day.includes('+')) {
			const firstDay = day.split('+')[0];
			const lastDay = day.split('+')[1];
			const days = `Events from ${dayjs(firstDay).format('dddd')}, ${dayjs(firstDay).format(
				'DD'
			)} to ${dayjs(lastDay).format('dddd')}, ${dayjs(lastDay).format('DD')}`;
			return days;
		}
	};
	if (!DateUrlValidation(day))
		return <Redirect to={`/home/events/${dayjs().format('YYYY-MM-DD')}`} />;
	return (
		<Fragment>
			<div className="row m-0 px-2">
				<div className="w-100 mt-2 mb-4 pb-4">
					<FeedSearch
						date={displayDay()}
						page="Events"
						setSearch={setSearch}
						sort={sort}
						setSort={setSort}
						type={type}
						setType={setType}
						price={price}
						setPrice={setPrice}
						tags={tags}
						setTags={setTags}
						errors={errors}
						setErrors={setErrors}
					/>
					<div className="border-top">
						<CQuery
							query={SEARCH_DAILY_EVENTS}
							variables={{
								date: day,
								search,
								limit: 10,
								sort,
								type,
								price,
								tags
							}}
							pollInterval={300000}
						>
							{({ data }) => {
								if (data.searchDailyEvents.ok) {
									const events = data.searchDailyEvents.body;
									return (
										<Fragment>
											{events.length === 0 ? (
												<div className="mt-4 font-italic ">No {displayDay()}</div>
											) : (
												<Fragment>
													{events.map(event => (
														<Spring from={{ opacity: 0 }} to={{ opacity: 1 }} key={event.id}>
															{props => (
																<div style={props}>
																	<EventFeedItem key={event.id} event={event} />
																</div>
															)}
														</Spring>
													))}
												</Fragment>
											)}
										</Fragment>
									);
								} else if (!data.searchDailyEvents.ok) {
									setErrors(data.searchDailyEvents.errors);
									return null;
								}
							}}
						</CQuery>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default React.memo(EventFeed);
