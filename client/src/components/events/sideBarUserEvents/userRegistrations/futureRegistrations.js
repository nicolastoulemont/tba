import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import CQuery from '../../../commons/CustomQueryComponent';
import { GET_USER_REGISTRATIONS } from '../../../graphql/user/Queries';

const FutureRegistrations = ({ user, day }) => {
  return (
    <Fragment>
      <CQuery query={GET_USER_REGISTRATIONS} variables={{ id: user }}>
        {({ data: { user } }) => {
          const registrations = user.registrations;
          if (registrations.length === 0)
            return (
              <div className="text-left px-3 py-2 border-top">
                <small>You did not register to an event yet</small>
              </div>
            );
          return (
            <Fragment>
              {registrations.map(registration => {
                if (registration.event.startDate < day) {
                  return null;
                } else {
                  return (
                    <div
                      className="text-left px-3 py-2 border-top"
                      key={registration.id}
                    >
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
                      <small className="d-block">
                        {registration.event.location}
                      </small>
                      {registration.event.startDate ===
                      registration.event.endDate ? (
                        <small className="d-block">
                          {registration.event.startDate} from{' '}
                          {registration.event.startTime} to{' '}
                          {registration.event.endTime}
                        </small>
                      ) : (
                        <small className="d-block">
                          On {registration.event.startDate} from{' '}
                          {registration.event.startTime} to{' '}
                          {registration.event.endTime} on{' '}
                          {registration.event.endDate}
                        </small>
                      )}
                    </div>
                  );
                }
              })}
            </Fragment>
          );
        }}
      </CQuery>
    </Fragment>
  );
};

export default FutureRegistrations;
