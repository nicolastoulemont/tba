import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const HostedEventsDisplay = ({ events }) => {
  return (
    <Fragment>
      {events.map(event => {
        return (
          <div className="text-left px-3 py-2 border-top" key={event.id}>
            <Link
              to={{
                pathname: `/event/${event.id}`
              }}
              className="link-menu"
            >
              <small className="font-weight-bold mr-2 link-menu">
                {event.name}
              </small>
            </Link>
            <small className="d-block">{event.location}</small>
            {event.startDate === event.endDate ? (
              <small className="d-block">
                {new Date(event.startDate).toDateString()} from{' '}
                {event.startTime} to {event.endTime}
              </small>
            ) : (
              <small className="d-block">
                On {event.startDate} from {event.startTime} to {event.endTime}{' '}
                on {event.endDate}
              </small>
            )}
          </div>
        );
      })}
    </Fragment>
  );
};

export default HostedEventsDisplay;
