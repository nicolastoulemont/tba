import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
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
		this.setState({
			selectedDay: selected ? undefined : day
		});
		this.props.history.push(`/home/events/${dayjs(day).format('YYYY-MM-DD')}`);
	}

	render() {
		const { user } = this.props;
		// console.log(this.state.selectedDay.toLocaleDateString());
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
						<DayPicker selectedDays={this.state.selectedDay} onDayClick={this.handleDayClick} />
					</div>
				</div>
				<div className="row">
					<SideBarUserEvents user={user.id} />
				</div>
			</div>
		);
	}
}
