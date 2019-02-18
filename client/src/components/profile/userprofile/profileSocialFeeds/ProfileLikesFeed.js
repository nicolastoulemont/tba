import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import CQuery from '../../../commons/CustomQueryComponent';
import { GET_USER_LIKES } from '../../../graphql/user/Queries';

const ProfileLikesFeed = ({ user, name }) => {
  return (
    <CQuery query={GET_USER_LIKES} variables={{ id: user }}>
      {({ data: { user } }) => {
        const likes = user.likes;
        if (likes.length === 0)
          return (
            <div className="text-left px-3 py-2 border-top">
              <small>{name} did not like anything yet</small>
            </div>
          );
        return (
          <Fragment>
            {likes.map(like => (
              <div className="text-left px-3 py-2 border-top" key={like.id}>
                <small>
                  {name} liked{' '}
                  <Link
                    to={{
                      pathname: `/event/${like.event[0].id}`
                    }}
                    className="font-weight-bold"
                  >
                    {like.event[0].name}
                  </Link>{' '}
                </small>
              </div>
            ))}
          </Fragment>
        );
      }}
    </CQuery>
  );
};

export default ProfileLikesFeed;
