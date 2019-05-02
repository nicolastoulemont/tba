import React, { useState } from 'react';
import dayjs from 'dayjs';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { useStateValue } from '../contexts/InitialState';

const DatesPicker = ({ history }) => {
	const [from, setFrom] = useState(null);
	const [to, setTo] = useState(null);
	const [enteredTo, setEnteredTo] = useState(null);
	const [{ userSearchPref }, dispatch] = useStateValue();

	const isSelectingFirstDay = (from, to, day) => {
		const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
		const isRangeSelected = from && to;
		return !from || isBeforeFirstDay || isRangeSelected;
	};

	const pushToURl = () => {
		const path = window.location.pathname;
		if (path.includes('events')) {
			if (!enteredTo) {
				dispatch({
					type: 'SET_DATESTRING',
					newDateString: {
						sort: userSearchPref.sort,
						type: userSearchPref.type,
						price: userSearchPref.price,
						tags: userSearchPref.tags,
						dateString: dayjs(from).format('YYYY-MM-DD')
					}
				});
				history.push(`/home/events/${dayjs(from).format('YYYY-MM-DD')}`);
			} else if (enteredTo) {
				if (enteredTo !== from) {
					dispatch({
						type: 'SET_DATESTRING',
						newDateString: {
							sort: userSearchPref.sort,
							type: userSearchPref.type,
							price: userSearchPref.price,
							tags: userSearchPref.tags,
							dateString: `${dayjs(from).format('YYYY-MM-DD')}+${dayjs(enteredTo).format(
								'YYYY-MM-DD'
							)}`
						}
					});
					history.push(
						`/home/events/${dayjs(from).format('YYYY-MM-DD')}+${dayjs(enteredTo).format(
							'YYYY-MM-DD'
						)}`
					);
				} else if (enteredTo === from) {
					dispatch({
						type: 'SET_DATESTRING',
						newDateString: {
							sort: userSearchPref.sort,
							type: userSearchPref.type,
							price: userSearchPref.price,
							tags: userSearchPref.tags,
							dateString: dayjs(from).format('YYYY-MM-DD')
						}
					});
					history.push(`/home/events/${dayjs(from).format('YYYY-MM-DD')}`);
				}
			}
		}
		if (path.includes('news')) {
			if (!enteredTo) {
				history.push(`/home/news/${dayjs(from).format('YYYY-MM-DD')}`);
			} else if (enteredTo) {
				if (enteredTo !== from) {
					history.push(
						`/home/news/${dayjs(from).format('YYYY-MM-DD')}+${dayjs(enteredTo).format(
							'YYYY-MM-DD'
						)}`
					);
				} else if (enteredTo === from) {
					history.push(`/home/news/${dayjs(from).format('YYYY-MM-DD')}`);
				}
			}
			return null;
		}
		if (path.includes('activities')) {
			if (!enteredTo) {
				history.push(`/home/activities/${dayjs(from).format('YYYY-MM-DD')}`);
			} else if (enteredTo) {
				if (enteredTo !== from) {
					history.push(
						`/home/activities/${dayjs(from).format('YYYY-MM-DD')}+${dayjs(enteredTo).format(
							'YYYY-MM-DD'
						)}`
					);
				} else if (enteredTo === from) {
					history.push(`/home/activities/${dayjs(from).format('YYYY-MM-DD')}`);
				}
			}
			return null;
		}
		return null;
	};

	const handleDayClick = async day => {
		if (from && to && day >= from && day <= to) {
			handleResetClick();
			return;
		}
		if (isSelectingFirstDay(from, to, day)) {
			setFrom(day);
			setTo(null);
			setEnteredTo(null);
		} else {
			setTo(day);
			setEnteredTo(day);
			pushToURl();
		}
	};

	const handleDayMouseEnter = day => {
		if (!isSelectingFirstDay(from, to, day)) {
			setEnteredTo(day);
		}
	};

	const handleResetClick = () => {
		setFrom(null);
		setTo(null);
		setEnteredTo(null);
	};

	const modifiers = { start: from, end: enteredTo };
	const disabledDays = { before: from };
	const selectedDays = [from, { from, to: enteredTo }];

	return (
		<div>
			<DayPicker
				className="Range"
				selectedDays={selectedDays}
				disabledDays={disabledDays}
				modifiers={modifiers}
				onDayClick={handleDayClick}
				onDayMouseEnter={handleDayMouseEnter}
			/>
			<div>
				{!from && !to && 'Please select the first day.'}
				{from && !to && 'Please select the last day.'}
				{from &&
					to &&
					`Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}
			</div>
		</div>
	);
};

export default React.memo(DatesPicker);
