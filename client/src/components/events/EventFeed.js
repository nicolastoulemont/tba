import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Spring } from 'react-spring/renderprops';
import CQuery from '../commons/CustomQueryComponent';
import EventFeedItem from './EventFeedItem';
import FeedSearch from '../commons/FeedSearch';
import { GET_DAY_EVENTS } from '../graphql/event/Queries';
import dayjs from 'dayjs';

export default function EventFeed(props) {
	const [search, setSearch] = useState('');
	const [sort, setSort] = useState('ascending');
	const [institutional, setInstitutional] = useState(false);
	const [onlyFree, setOnlyFree] = useState(false);

	const { user, interestOne, interestTwo, interestThree } = props;
	const day = props.match.params.day;
	const displayDay = dayjs(day).format('dddd');

	const validateDate = day => {
		const today = new Date();
		if (!dayjs(day).isValid())
			return <Redirect to={`/home/events/${dayjs(today).format('YYYY-MM-DD')}`} />;
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
						<CQuery
							query={GET_DAY_EVENTS}
							variables={{ day, interestOne, interestTwo, interestThree }}
						>
							{({ data }) => {
								if (data) {
									if (data.onedayevents.length === 0) {
										return (
											<div className="mt-4 pl-4 font-italic ">No events that {displayDay}</div>
										);
									} else {
										return (
											<div className="border-top">
												{data.onedayevents.map(event => (
													<Spring from={{ opacity: 0 }} to={{ opacity: 1 }} key={event.id}>
														{props => (
															<div style={props}>
																<EventFeedItem key={event.id} currentUser={user} event={event} />
															</div>
														)}
													</Spring>
												))}
											</div>
										);
									}
								}
							}}
						</CQuery>
					</div>
				</div>
			</Fragment>
		);
	};

	return <Fragment>{validateDate(day)}</Fragment>;
}
