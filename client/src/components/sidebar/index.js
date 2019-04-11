import React, { useState } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import dayjs from 'dayjs';
import { Spring } from 'react-spring/renderprops';
import SBProfile from './sideBarProfile';
import SBPanel from './sideBarPanel';
import SBNoProfile from './sideBarNoProfile';

const SideBar = ({ user, history }) => {
	const [selectedDay, setSelectedDay] = useState(null);
	const path = window.location.pathname;

	const handleDayClick = (day, { selected }) => {
		const path = window.location.pathname;
		setSelectedDay(selected ? undefined : day);

		if (path.includes('events')) {
			history.push(`/home/events/${dayjs(day).format('YYYY-MM-DD')}`);
		}
		if (path.includes('news')) {
			// Option to rework the home/news/ component
			// history.push(`/home/news/${dayjs(day).format('YYYY-MM-DD')}`);
			return null;
		}
		return null;
	};

	return (
		<div className="d-none d-lg-block col-lg-4 text-center">
			<div className="row">
				{user.profile ? (
					<SBProfile avatar={user.profile.picture_URL} name={user.profile.name} user={user.id} />
				) : (
					<SBNoProfile user={user} />
				)}
			</div>
			{path.includes('events') || path.includes('news') ? (
				<Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
					{props => (
						<div className="row bg-white pr-0 ml-2 mb-4" style={props}>
							<div className="col">
								<DayPicker
									selectedDays={selectedDay}
									onDayClick={handleDayClick}
									// disabledDays={{ daysOfWeek: [0, 6] }}
								/>
							</div>
						</div>
					)}
				</Spring>
			) : null}
			<div className="row">
				<SBPanel user={user.id} />
			</div>
		</div>
	);
};

export default SideBar;
