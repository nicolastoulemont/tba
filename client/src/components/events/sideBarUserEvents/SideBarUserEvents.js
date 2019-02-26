import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import CQuery from '../../commons/CustomQueryComponent';
import { GET_USER_EVENTS } from '../../graphql/user/Queries';

const SideBarUserEvents = ({ user }) => {
  return (
    <div className="col pr-0">
      <div className="ml-2 border-0 bg-white">
        <div className="text-uppercase py-2">Your events</div>
        <Fragment>
          <CQuery query={GET_USER_EVENTS} variables={{ id: user }}>
            {({ data: { user } }) => {
              const events = user.events;
              if (events.length === 0)
                return (
                  <div className="text-left px-3 py-2 border-top">
                    <small>Did not attend an event yet</small>
                  </div>
                );
              return (
                <Fragment>
                  {events.map(event => (
                    <div
                      className="text-left px-3 py-2 border-top"
                      key={event.id}
                    >
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
                        <small className="d-block">{event.location}</small>
                      </div>
                    </div>
                  ))}
                </Fragment>
              );
            }}
          </CQuery>
        </Fragment>
      </div>
    </div>
  );
};

export default SideBarUserEvents;
