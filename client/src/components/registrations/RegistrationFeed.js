import React, { Component, Fragment } from 'react';
import { RegisterEvent, UnRegisterEvent } from './RegistrationActions';
import CQuery from '../commons/CustomQueryComponent';
import { GET_EVENT_REGISTRATIONS_IDS } from '../graphql/registration/Queries';

class RegistrationFeed extends Component {
  getUserRegistrationId = (registrations, user) => {
    let userRegistrationObj = registrations.find(
      registration => registration.user_ID === user
    );
    return userRegistrationObj;
  };
  render() {
    const { user, event_ID } = this.props;
    return (
      <Fragment>
        <CQuery query={GET_EVENT_REGISTRATIONS_IDS} variables={{ id: event_ID }}>
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
                <div className="text-right pr-4">
                  {typeof userRegistration === 'undefined' ? (
                    <RegisterEvent
                      user={user}
                      event_ID={event_ID}
                      refetch={refetch}
                      client={client}
                    />
                  ) : (
                    <UnRegisterEvent
                      userRegistration={userRegistration}
                      refetch={refetch}
                      client={client}
                      event_ID={event_ID}
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
