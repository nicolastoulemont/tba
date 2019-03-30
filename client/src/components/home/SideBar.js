import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import dayjs from 'dayjs';
import SideBarUserProfile from '../profile/SideBarUserProfile';
import SideBarUserEvents from '../events/sideBarUserEvents/SideBarUserEvents';

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
	}

	render() {
		const { user } = this.props;
		if (!user.profile) {
			return (
				<div className="d-none d-lg-block col-lg-4 text-center">
					<div className="row">
						<Link to={`/home/profile/create/${user.id}`}>
							<p>Create your profile to register and likes events and post comments</p>
						</Link>
					</div>
					<div className="row bg-white pr-0 ml-2 mb-4">
						<div className="col">
							<DayPicker />
						</div>
					</div>
				</div>
			);
		}
		return (
			<div className="d-none d-lg-block col-lg-4 text-center">
				<div className="row">
					<SideBarUserProfile
						avatar={user.profile.picture_URL}
						name={user.profile.name}
						user={user.id}
					/>
				</div>
				<div className="row bg-white pr-0 ml-2 mb-4">
					<div className="col">
						<DayPicker
							selectedDays={this.state.selectedDay}
							onDayClick={this.handleDayClick}
							// disabledDays={{ daysOfWeek: [0, 6] }}
						/>
					</div>
				</div>
				<div className="row">
					<SideBarUserEvents user={user.id} />
				</div>
			</div>
		);
	}
}
