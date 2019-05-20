import React, { useState, Fragment } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import CQuery from '../../commons/CustomQueryComponent';
import { GET_MOST_LIKED_EVENTS } from '../../graphql/event/Queries';
import PanelItem from '../../commons/PanelItem';

const PublicSuggestionPanel = () => {
	const [type, setType] = useState('');
	const [price, setPrice] = useState(10000);
	const [day, setDay] = useState(false);
	const [threeDays, setThreeDays] = useState(false);
	const [week, setWeek] = useState(true);

	const fetchWeek = e => {
		setDay(false);
		setThreeDays(false);
		setWeek(true);
	};
	const fetchThreeDays = e => {
		setDay(false);
		setThreeDays(true);
		setWeek(false);
	};
	const fetchDay = e => {
		setDay(true);
		setThreeDays(false);
		setWeek(false);
	};

	const handleType = e => {
		if (type === '') setType('institutional');
		if (type === 'institutional') setType('');
	};

	const handlePrice = e => {
		if (price === 0) setPrice(10000);
		if (price === 10000) setPrice(0);
	};

	const returnDateString = () => {
		const today = dayjs().format('YYYY-MM-DD');
		const nextThreeDays = `${dayjs().format('YYYY-MM-DD')}+${dayjs()
			.add(3, 'day')
			.format('YYYY-MM-DD')}`;
		const nextWeek = `${dayjs().format('YYYY-MM-DD')}+${dayjs()
			.add(7, 'day')
			.format('YYYY-MM-DD')}`;
		if (week) return nextWeek;
		if (threeDays) return nextThreeDays;
		if (day) return today;
	};

	return (
		<Fragment>
			<div className="row m-0 p-0">
				<div className="col">
					<h6 className="px-2 text-left">Suggestions</h6>
				</div>
				<div className="col">
					<div className="text-right">
						<Link
							to="#"
							data-togggle="tooltip"
							data-placement="bottom"
							title="Only show institutional events"
							onClick={handleType}
						>
							{' '}
							{type === 'institutional' ? (
								<i className="fas fa-university text-blue mx-2 mt-2" />
							) : (
								<i className="fas fa-university mx-2 mt-2" />
							)}
						</Link>
						<Link
							to="#"
							data-togggle="tooltip"
							data-placement="bottom"
							title="Only show free events"
							onClick={handlePrice}
						>
							{' '}
							{price === 0 ? (
								<i className="fab fa-creative-commons-nc-eu text-blue mx-2 mt-2" />
							) : (
								<i className="fab fa-creative-commons-nc-eu mx-2 mt-2" />
							)}
						</Link>
					</div>
				</div>
			</div>
			<div className="row m-0 py-2 border-bottom">
				<div className="col border-right p-0">
					<Link
						className="link-menu"
						to="#"
						onClick={fetchDay}
						data-togggle="tooltip"
						data-placement="bottom"
						title="Today's most popular events"
					>
						<small className="d-inline font-weight-bold text-muted">Today's</small>
					</Link>
				</div>
				<div className="col border-right p-0">
					<Link
						to="#"
						className="link-menu"
						onClick={fetchThreeDays}
						data-togggle="tooltip"
						data-placement="bottom"
						title="The most popular events in the next 3 days"
					>
						<small className="d-inline font-weight-bold text-muted">Next Three days</small>
					</Link>
				</div>
				<div className="col p-0">
					<Link
						to="#"
						className="link-menu"
						onClick={fetchWeek}
						data-togggle="tooltip"
						data-placement="bottom"
						title="The most popular events in the next 7 days"
					>
						<small className="d-inline font-weight-bold text-muted">Next 7 days</small>
					</Link>
				</div>
			</div>
			<div className="row m-0 p-0">
				<div className="mt-1 w-100">
					<CQuery
						query={GET_MOST_LIKED_EVENTS}
						variables={{ date: returnDateString(), limit: 3, type, price, tags: [] }}
					>
						{({ data }) => {
							console.log(data);
							if (data.mostLikedEvents && data.mostLikedEvents.body) {
								const events = data.mostLikedEvents.body;
								if (events.length !== 0) {
									return (
										<Fragment>
											{events.map(event => (
												<PanelItem event={event} key={event.id} />
											))}
										</Fragment>
									);
								} else if (events.length === 0) {
									return <small>No events yet</small>;
								}
							} else {
								return <small>No events yet</small>;
							}
						}}
					</CQuery>
				</div>
			</div>
		</Fragment>
	);
};

export default React.memo(PublicSuggestionPanel);
