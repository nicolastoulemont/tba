import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import {
  ADD_REGISTRATION,
  DELETE_REGISTRATION
} from '../graphql/registration/Mutations';

export const RegisterEvent = ({ user, eventId, refetch }) => {
  return (
    <Fragment>
      <Mutation mutation={ADD_REGISTRATION}>
        {(addRegistration, e) => (
          <Link
            to="#"
            className="mr-2"
            onClick={e => {
              e.preventDefault();
              addRegistration({
                variables: {
                  userId: user,
                  eventId
                }
              }).then(res => {
                refetch();
              });
            }}
          >
            <i className="text-secondary fas fa-check" />
          </Link>
        )}
      </Mutation>
    </Fragment>
  );
};

export const UnRegisterEvent = ({ userRegistration, refetch }) => {
  return (
    <Fragment>
      <Mutation mutation={DELETE_REGISTRATION}>
        {(deleteRegistration, e) => (
          <Link
            to="#"
            className="ml-2"
            onClick={e => {
              e.preventDefault();
              deleteRegistration({
                variables: {
                  _id: userRegistration.id
                }
              }).then(res => {
                refetch();
              });
            }}
          >
            <i className="text-secondary far fa-times-circle" />
          </Link>
        )}
      </Mutation>
    </Fragment>
  );
};
