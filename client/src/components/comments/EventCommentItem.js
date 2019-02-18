import React from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { DELETE_COMMENT } from '../graphql/comment/Mutations';

const EventCommentItem = ({
  id,
  text,
  creatorName,
  creatorId,
  creatorAvatar,
  refetch
}) => {
  return (
    <div className="list-group-item border-0 py-2 px-2" key={id}>
      <div className="row">
        <div className="col-1">
          <Link to={{ pathname: `/profile/${creatorId}` }}>
            {creatorAvatar ? (
              <div>
                <img
                  className="d-none d-md-block rounded-circle border-avatar small-avatar"
                  src={creatorAvatar}
                  alt="User Avatar"
                />
                <img
                  className="d-block d-md-none rounded-circle border-avatar ultra-small-avatar"
                  src={creatorAvatar}
                  alt="User Avatar"
                />
              </div>
            ) : (
              <i className="fas fa-user-astronaut fa-3x" />
            )}
          </Link>
        </div>
        <div className="col-9 col-md-10 mx-0 pr-0">
          <div className="text-left mx-auto">
            <Link
              to={{
                pathname: `/profile/${creatorId}`
              }}
              className="d-none d-md-block font-weight-bold text-darkblue"
            >
              {creatorName}
            </Link>
            {` `}
            <p className="d-none d-md-block">{text}</p>
            <p className="d-block d-md-none ml-2">{text}</p>
          </div>
        </div>
        <div className="col-1 mx-0">
          <Mutation mutation={DELETE_COMMENT}>
            {(deleteComment, e) => (
              <Link
                to="#"
                className="m-0 p-0 text-right"
                onClick={e => {
                  e.preventDefault();
                  deleteComment({
                    variables: {
                      _id: id
                    }
                  }).then(res => {
                    refetch();
                  });
                }}
              >
                <i className="fa fa-times mx-0" aria-hidden="true" />
              </Link>
            )}
          </Mutation>
        </div>
      </div>
    </div>
  );
};

export default EventCommentItem;
