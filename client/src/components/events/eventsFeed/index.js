import dayjs from 'dayjs';
import React, { Fragment, useState } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { Redirect } from 'react-router-dom';
import { Spring } from 'react-spring/renderprops';
import FeedSearch from '../../commons/FeedSearch';
import { FetchError } from '../../commons/UserActionsComponents';
import { SEARCH_DAILY_EVENTS } from '../../graphql/event/Queries';
import EventFeedItem from './feedItem';

export default function EventFeed({ match }) {
	const [search, setSearch] = useState('');
	const [sort, setSort] = useState('ascending');
	const [institutional, setInstitutional] = useState(false);
	const [onlyFree, setOnlyFree] = useState(false);

	const day = match.params.day;
	const displayDay = dayjs(day).format('dddd');
	const today = new Date();

	if (!dayjs(day).isValid())
		return <Redirect to={`/home/events/${dayjs(today).format('YYYY-MM-DD')}`} />;

	const { data, error } = useQuery(SEARCH_DAILY_EVENTS, {
		variables: { date: day, search, limit: 10, sort },
		suspend: true
	});
	if (error) return <FetchError />;
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
						institutional={institutional}
						setInstitutional={setInstitutional}
						onlyFree={onlyFree}
						setOnlyFree={setOnlyFree}
					/>
					{data.searchDailyEvents.length === 0 ? (
						<div className="mt-4 pl-4 font-italic ">No events that {displayDay}</div>
					) : (
						<div className="border-top">
							{data.searchDailyEvents.map(event => (
								<Spring from={{ opacity: 0 }} to={{ opacity: 1 }} key={event.id}>
									{props => (
										<div style={props}>
											<EventFeedItem key={event.id} event={event} />
										</div>
									)}
								</Spring>
							))}
						</div>
					)}
				</div>
			</div>
		</Fragment>
	);
}
