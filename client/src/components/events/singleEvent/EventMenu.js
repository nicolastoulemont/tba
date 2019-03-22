import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EditEventModal from '../EditEventModal';
import DeleteEventModal from '../DeleteEventModal';

class EventMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			eventDeleted: false,
			errorMsg: ''
		};
	}

	componentDidUpdate() {
		if (this.state.eventDeleted) {
			this.props.history.push('/dashboard');
		}
	}
	render() {
		const {
			event_ID,
			ispublic,
			name,
			categoryOne,
			categoryTwo,
			categoryThree,
			start,
			end,
			description,
			location,
			eventCreator,
			currentUser,
			refetch
		} = this.props;
		return (
			<div className="text-right mt-0 mr-2">
				<Link
					className="far fa-edit text-white"
					data-toggle="modal"
					data-target="#EditEventModal"
					to="#"
				/>
				<EditEventModal
					event_ID={event_ID}
					eventCreator={eventCreator}
					currentUser={currentUser}
					name={name}
					ispublic={ispublic}
					categoryOne={categoryOne}
					categoryTwo={categoryTwo}
					categoryThree={categoryThree}
					start={start}
					end={end}
					description={description}
					location={location}
					refetch={refetch}
				/>
				<Link
					className="fa fa-times mx-2 text-white"
					data-toggle="modal"
					data-target="#DeleteEventModal"
					to="#"
				/>
				<DeleteEventModal
					event_ID={event_ID}
					currentUser={currentUser}
					history={this.props.history}
				/>
			</div>
		);
	}
}

export default EventMenu;
