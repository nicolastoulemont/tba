import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import CQuery from '../../../commons/CustomQueryComponent';
import { GET_USER_EVENTS } from '../../../graphql/user/Queries';

const FutureHostedEvents = ({ user, day }) => {
  return (
    <Fragment>
      <CQuery query={GET_USER_EVENTS} variables={{ id: user }}>
        {({ data: { user } }) => {
          const events = user.events;
          if (events.length === 0)
            return (
              <div className="text-left px-3 py-2 border-top">
                <small>You haven't created an event yet</small>
              </div>
            );
          return (
            <Fragment>
              {events.map(event => {
                if (event.startDate < day) {
                  return null;
                } else {
                  return (
                    <div
                      className="text-left px-3 py-2 border-top"
                      key={event.id}
                    >
                      <div>
                        <Link
                          to={{
                            pathname: `/event/${event.id}`
                          }}
                          className="link-menu"
                        >
                          <small className="font-weight-bold mr-2">
                            {event.name}
                          </small>
                        </Link>
                        <small className="d-block">{event.location}</small>
                        {event.startDate === event.endDate ? (
                          <small className="d-block">
                            {event.startDate} from {event.startTime} to{' '}
                            {event.endTime}
                          </small>
                        ) : (
                          <small className="d-block">
                            On {event.startDate} from {event.startTime} to{' '}
                            {event.endTime} on {event.endDate}
                          </small>
                        )}
                      </div>
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

export default FutureHostedEvents;
