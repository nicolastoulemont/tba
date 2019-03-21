import React, { Fragment } from 'react';
import CQuery from '../commons/CustomQueryComponent';
import { RespSmallAvatarLink, UserNameLink } from '../commons/CustomLinks';
import { GET_EVENT_REGISTRATIONS } from '../graphql/registration/Queries';

const EventRegistrationFeed = ({ event_ID }) => {
  return (
    <Fragment>
      <CQuery query={GET_EVENT_REGISTRATIONS} variables={{ id: event_ID }}>
        {({
          data: {
            event: { registrations }
          }
        }) => {
          if (registrations.length === 0) {
            return <div className="font-italic">No participant yet</div>;
          } else {
            return (
              <Fragment>
                {registrations.map(registration => (
                  <div
                    className="list-group-item border-0 py-1 px-4"
                    key={registration.id}
                  >
                    <div className="row">
                      <div className="col-1">
                        <RespSmallAvatarLink
                          id={registration.user_ID}
                          avatar={registration.creator.avatar}
                        />
                      </div>
                      <div className="col-10 mx-0 pr-0 pl-1">
                        <div className="text-left mx-auto">
                          <div className="block">
                            <UserNameLink
                              id={registration.user_ID}
                              name={registration.creator.profile.name}
                            />
                          </div>
                          <div className="d-none d-md-block">
                            {registration.creator.profile.position} at{' '}
                            {registration.creator.profile.organisation}
                          </div>
                          <div className="d-block d-md-none ml-4">
                            {registration.creator.profile.position} at{' '}
                            {registration.creator.profile.organisation}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Fragment>
            );
          }
        }}
      </CQuery>
    </Fragment>
  );
};

export default EventRegistrationFeed;
