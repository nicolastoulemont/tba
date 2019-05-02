import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import dayjs from 'dayjs';
import FeedSearch from '../commons/FeedSearch';
import { DateUrlValidation } from '../commons/DateUrlValidation';
import { useStateValue } from '../contexts/InitialState';

import ManageRegistrations from './ManageRegistrations';
import ManageEvents from './ManageEvents';

const ManageActivities = ({ match }) => {
	const [displayRegistrations, setDisplayRegistrations] = useState(true);

	const [{ userSearchPref }] = useStateValue();
	const [search, setSearch] = useState('');
	const [sort, setSort] = useState(userSearchPref.sort);
	const [type, setType] = useState(userSearchPref.type);
	const [price, setPrice] = useState(userSearchPref.price);
	const [tags, setTags] = useState(userSearchPref.tags);

	const day = match.params.day;

	const displayDay = () => {
		if (!day.includes('+')) {
			const date = `Activities on ${dayjs(day).format('dddd')} `;
			return date;
		}
		if (day.includes('+')) {
			const firstDay = day.split('+')[0];
			const lastDay = day.split('+')[1];
			const days = `Activities from ${dayjs(firstDay).format('dddd')}, ${dayjs(firstDay).format(
				'DD'
			)} to ${dayjs(lastDay).format('dddd')}, ${dayjs(lastDay).format('DD')}`;
			return days;
		}
	};
	if (!DateUrlValidation(day))
		return <Redirect to={`/home/activities/${dayjs().format('YYYY-MM-DD')}`} />;

	return (
		<div className="row m-0 px-2">
			<div className="w-100 mt-2 mb-4 pb-4">
				<FeedSearch
					date={displayDay()}
					setSearch={setSearch}
					sort={sort}
					setSort={setSort}
					type={type}
					setType={setType}
					displayRegistrations={displayRegistrations}
					setDisplayRegistrations={setDisplayRegistrations}
					tags={tags}
					setTags={setTags}
				/>
				<div className="border-top">
					{displayRegistrations ? <ManageRegistrations /> : <ManageEvents />}
				</div>
			</div>
		</div>
	);
};

export default ManageActivities;
