import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import CQuery from '../../../commons/CustomQueryComponent';
import { GET_USER_EVENTS } from '../../../graphql/user/Queries';

const ProfileEventsFeed = ({ user }) => {
  return (
    <CQuery query={GET_USER_EVENTS} variables={{ id: user }}>
      {({ data: { user } }) => {
        const events = user.events;
        console.log(events);
        if (events.length === 0)
          return (
            <div className="text-left px-3 py-2 border-top">
              <small>Did not attend an event yet</small>
            </div>
          );
        return (
          <Fragment>
            {events.map(event => (
              <div className="text-left px-3 py-2 border-top" key={event.id}>
                <div>
                  <Link
                    to={{
                      pathname: `/event/${event.id}`
                    }}
                    className="d-block"
                  >
                    <small className="font-weight-bold mr-2">
                      {event.name}
                    </small>
                  </Link>
                  {event.startDate === event.endDate ? (
                    <small className="my-1">
                      {event.startDate} : {event.startTime} to {event.endTime}
                    </small>
                  ) : (
                    <small className="my-1">
                      On {event.startDate} from {event.startTime} to{' '}
                      {event.endTime} on {event.endDate}
                    </small>
                  )}
                  <small className="d-block">{event.location}</small>
                </div>
              </div>
            ))}
          </Fragment>
        );
      }}
    </CQuery>
  );
};

export default ProfileEventsFeed;
