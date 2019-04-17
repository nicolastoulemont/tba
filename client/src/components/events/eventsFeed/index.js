import dayjs from 'dayjs';
import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Spring } from 'react-spring/renderprops';
import CQuery from '../../commons/CustomQueryComponent';
import FeedSearch from '../../commons/FeedSearch';
import { useStateValue } from '../../contexts/InitialState';
import { SEARCH_DAILY_EVENTS } from '../../graphql/event/Queries';
import EventFeedItem from './feedItem';

export default function EventFeed({ match }) {
	const [{ userSearchPref }, dispatch] = useStateValue();

	const [search, setSearch] = useState('');
	const [sort, setSort] = useState(userSearchPref.sort);
	const [type, setType] = useState(userSearchPref.type);
	const [price, setPrice] = useState(userSearchPref.price);

	const day = match.params.day;
	const displayDay = dayjs(day).format('dddd');
	const today = new Date();

	if (!dayjs(day).isValid())
		return <Redirect to={`/home/events/${dayjs(today).format('YYYY-MM-DD')}`} />;
	console.log(price);
	return (
		<Fragment>
			<div className="row m-0 px-2">
				<div className="w-100 mt-2 mb-4 pb-4">
					<FeedSearch
						date={displayDay}
						page="events"
						setSearch={setSearch}
						sort={sort}
						setSort={setSort}
						type={type}
						setType={setType}
						price={price}
						setPrice={setPrice}
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
								price: price
							}}
						>
							{({ data }) => {
								const events = data.searchDailyEvents;
								return (
									<Fragment>
										{events.length === 0 ? (
											<div className="mt-4 pl-4 font-italic ">No events that {displayDay}</div>
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
							}}
						</CQuery>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
