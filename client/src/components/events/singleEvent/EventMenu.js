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
      eventId,
      ispublic,
      name,
      categoryOne,
      categoryTwo,
      categoryThree,
      startDate,
      startTime,
      endDate,
      endTime,
      description,
      location,
      eventCreator,
      loggedUser,
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
          eventId={eventId}
          eventCreator={eventCreator}
          loggedUser={loggedUser}
          name={name}
          ispublic={ispublic}
          categoryOne={categoryOne}
          categoryTwo={categoryTwo}
          categoryThree={categoryThree}
          startDate={startDate}
          startTime={startTime}
          endDate={endDate}
          endTime={endTime}
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
        <DeleteEventModal eventId={eventId} history={this.props.history} />
      </div>
    );
  }
}

export default EventMenu;
