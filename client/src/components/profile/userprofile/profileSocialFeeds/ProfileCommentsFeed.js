import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import CQuery from '../../../commons/CustomQueryComponent';
import { GET_USER_COMMENTS } from '../../../graphql/user/Queries';

const ProfileCommentsFeed = ({ user, name }) => {
  return (
    <CQuery query={GET_USER_COMMENTS} variables={{ id: user }}>
      {({ data: { user } }) => {
        const comments = user.comments;
        if (comments.length === 0)
          return (
            <div className="text-left px-3 py-2 border-top">
              <small>{name} did not write a comment yet</small>
            </div>
          );
        return (
          <Fragment>
            {comments.map(comment => (
              <div className="text-left px-3 py-1 border-top" key={comment.id}>
                <blockquote className="blockquote mb-1">
                  <footer className="blockquote-footer">
                    <small>{name} commented on </small>
                    <cite title={comment.event.name}>
                      {' '}
                      <Link
                        to={{
                          pathname: `/event/${comment.event.id}`
                        }}
                      >
                        <small className="font-weight-bold">
                          {comment.event.name}
                        </small>
                      </Link>
                    </cite>
                  </footer>
                  <small className="py-0 my-0">
                    <small>{comment.text}</small>
                  </small>
                </blockquote>
              </div>
            ))}
          </Fragment>
        );
      }}
    </CQuery>
  );
};

export default ProfileCommentsFeed;
