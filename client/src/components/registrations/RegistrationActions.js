import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import {
  ADD_REGISTRATION,
  DELETE_REGISTRATION
} from '../graphql/registration/Mutations';

export const RegisterEvent = ({ user, eventId, refetch, client }) => {
  return (
    <Fragment>
      <Mutation mutation={ADD_REGISTRATION}>
        {(addRegistration, e) => (
          <Link
            to="#"
            onClick={e => {
              e.preventDefault();
              addRegistration({
                variables: {
                  userId: user,
                  eventId
                }
              }).then(res => {
                client.resetStore();
              });
            }}
          >
            <h6 className="d-none d-md-inline font-weight-bold text-uppercase">
              Register
            </h6>
          </Link>
        )}
      </Mutation>
    </Fragment>
  );
};

export const UnRegisterEvent = ({ userRegistration, client }) => {
  return (
    <Fragment>
      <Mutation mutation={DELETE_REGISTRATION}>
        {(deleteRegistration, e) => (
          <Link
            to="#"
            onClick={e => {
              e.preventDefault();
              deleteRegistration({
                variables: {
                  _id: userRegistration.id
                }
              }).then(res => {
                client.resetStore();
              });
            }}
          >
            <h6 className="d-none d-md-inline font-weight-bold text-uppercase">
              Unregister
            </h6>
          </Link>
        )}
      </Mutation>
    </Fragment>
  );
};
