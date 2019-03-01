import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const RegistrationsDisplay = ({ registrations }) => {
  return (
    <Fragment>
      {registrations.map(registration => {
        return (
          <div className="text-left px-3 py-2 border-top" key={registration.id}>
            <Link
              to={{
                pathname: `/event/${registration.event.id}`
              }}
              className="link-menu"
            >
              <small className="font-weight-bold mr-2 link-menu">
                {registration.event.name}
              </small>
            </Link>
            <small className="d-block">{registration.event.location}</small>
            {registration.event.startDate === registration.event.endDate ? (
              <small className="d-block">
                {new Date(registration.event.startDate).toDateString()} from{' '}
                {registration.event.startTime} to {registration.event.endTime}
              </small>
            ) : (
              <small className="d-block">
                On {registration.event.startDate} from{' '}
                {registration.event.startTime} to {registration.event.endTime}{' '}
                on {registration.event.endDate}
              </small>
            )}
          </div>
        );
      })}
    </Fragment>
  );
};

export default RegistrationsDisplay;
