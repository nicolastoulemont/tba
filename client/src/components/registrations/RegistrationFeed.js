import React, { Component, Fragment } from 'react';
import { RegisterEvent, UnRegisterEvent } from './RegistrationActions';
import CQuery from '../commons/CustomQueryComponent';
import { GET_EVENT_REGISTRATIONS } from '../graphql/registration/Queries';

class RegistrationFeed extends Component {
  getUserRegistrationId = (registrations, user) => {
    let userRegistrationObj = registrations.find(
      registration => registration.userId === user
    );
    return userRegistrationObj;
  };
  render() {
    const { user, eventId } = this.props;
    return (
      <Fragment>
        <CQuery query={GET_EVENT_REGISTRATIONS} variables={{ id: eventId }}>
          {({
            data: {
              event: { registrations }
            },
            refetch,
            client
          }) => {
            let userRegistration = this.getUserRegistrationId(
              registrations,
              user
            );
            return (
              <Fragment>
                <div className="text-right align-middle">
                  <span className="mr-2">{registrations.length} attendees</span>
                  {typeof userRegistration === 'undefined' ? (
                    <RegisterEvent
                      user={user}
                      eventId={eventId}
                      refetch={refetch}
                      client={client}
                    />
                  ) : (
                    <UnRegisterEvent
                      userRegistration={userRegistration}
                      refetch={refetch}
                      client={client}
                    />
                  )}
                </div>
              </Fragment>
            );
          }}
        </CQuery>
      </Fragment>
    );
  }
}

export default RegistrationFeed;
