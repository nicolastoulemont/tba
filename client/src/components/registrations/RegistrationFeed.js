import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
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
            refetch
          }) => {
            let userRegistration = this.getUserRegistrationId(
              registrations,
              user
            );
            return (
              <Fragment>
                <div className="text-right align-middle">
                  {typeof userRegistration === 'undefined' ? (
                    <RegisterEvent
                      user={user}
                      eventId={eventId}
                      refetch={refetch}
                    />
                  ) : (
                    <Link to="#" className="mr-1">
                      <i className="text-success fas fa-check" />
                    </Link>
                  )}
                  <span className="mx-2">{registrations.length}</span>
                  {typeof userRegistration !== 'undefined' ? (
                    <UnRegisterEvent
                      userRegistration={userRegistration}
                      refetch={refetch}
                    />
                  ) : (
                    <Link to="#" className="ml-2">
                      <i className="text-secondary far fa-times-circle" />
                    </Link>
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
