import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import dayjs from 'dayjs';
import { Spring } from 'react-spring/renderprops';
import SBProfile from './sideBarProfile';
import SBPanel from './sideBarPanel';

export default class SideBar extends Component {
	constructor(props) {
		super(props);
		this.handleDayClick = this.handleDayClick.bind(this);
		this.state = {
			selectedDay: null
		};
	}

	handleDayClick(day, { selected }) {
		const path = window.location.pathname;
		this.setState({
			selectedDay: selected ? undefined : day
		});
		if (path.includes('events')) {
			this.props.history.push(`/home/events/${dayjs(day).format('YYYY-MM-DD')}`);
		}
		if (path.includes('news')) {
			// Option to rework the home/news/ component
			// this.props.history.push(`/home/events/${dayjs(day).format('YYYY-MM-DD')}`);
			return null;
		}
		return null;
	}

	render() {
		const { user } = this.props;
		const path = window.location.pathname;
		return (
			<div className="d-none d-lg-block col-lg-4 text-center">
				<div className="row">
					{user.profile ? (
						<SBProfile avatar={user.profile.picture_URL} name={user.profile.name} user={user.id} />
					) : (
						<Link to={`/home/profile/create/${user.id}`}>
							<p>Create your profile to register and likes events and post comments</p>
						</Link>
					)}
				</div>
				{path.includes('events') || path.includes('news') ? (
					<Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
						{props => (
							<div className="row bg-white pr-0 ml-2 mb-4" style={props}>
								<div className="col">
									<DayPicker
										selectedDays={this.state.selectedDay}
										onDayClick={this.handleDayClick}
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
	}
}
