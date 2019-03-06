import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { ADD_LIKE, DELETE_LIKE } from '../../graphql/like/Mutations';

export const LikeComment = ({ user, commentId, refetch }) => {
  return (
    <Fragment>
      <Mutation mutation={ADD_LIKE}>
        {(addLike, e) => (
          <Link
            to="#"
            className="mr-2"
            onClick={e => {
              e.preventDefault();
              addLike({
                variables: {
                  userId: user,
                  commentId
                }
              }).then(res => {
                refetch();
              });
            }}
          >
            <i className="text-secondary far fa-thumbs-up" />
          </Link>
        )}
      </Mutation>
    </Fragment>
  );
};

export const UnLikeComment = ({ userLike, refetch, user }) => {
  return (
    <Fragment>
      <Mutation mutation={DELETE_LIKE}>
        {(deleteLike, e) => (
          <Link
            to="#"
            className="ml-2"
            onClick={e => {
              e.preventDefault();
              deleteLike({
                variables: {
                  _id: userLike.id,
                  userId: user
                }
              }).then(res => {
                refetch();
              });
            }}
          >
            <i className="text-secondary far fa-thumbs-down" />
          </Link>
        )}
      </Mutation>
    </Fragment>
  );
};
