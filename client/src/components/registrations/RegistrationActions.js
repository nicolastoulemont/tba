import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import {
  ADD_REGISTRATION,
  DELETE_REGISTRATION
} from '../graphql/registration/Mutations';

export const RegisterEvent = ({ user, event_ID, refetch, client }) => {
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
                  user_ID: user,
                  event_ID
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

export const UnRegisterEvent = ({
  userRegistration,
  client,
  refetch,
  event_ID
}) => {
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
