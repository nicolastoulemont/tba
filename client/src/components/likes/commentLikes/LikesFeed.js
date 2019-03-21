import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { LikeComment, UnLikeComment } from './LikeActions';
import CQuery from '../../commons/CustomQueryComponent';
import { GET_COMMENT_LIKES } from '../../graphql/like/Queries';

class LikesFeed extends Component {
  getUserLikeId = (likes, user) => {
    let userLikeObj = likes.find(like => like.user_ID === user);
    return userLikeObj;
  };
  render() {
    const { user, comment_ID } = this.props;
    return (
      <Fragment>
        <CQuery query={GET_COMMENT_LIKES} variables={{ id: comment_ID }}>
          {({
            data: {
              comment: { likes }
            },
            refetch
          }) => {
            let userLike = this.getUserLikeId(likes, user);
            return (
              <Fragment>
                {typeof userLike === 'undefined' ? (
                  <LikeComment
                    user={user}
                    comment_ID={comment_ID}
                    refetch={refetch}
                  />
                ) : (
                  <Link to="#" className="mr-2">
                    <i className="text-darkblue fa fa-thumbs-up" />
                  </Link>
                )}
                {likes.length !== 0 ? (
                  <span className="mx-1">{likes.length}</span>
                ) : null}
                {typeof userLike !== 'undefined' ? (
                  <UnLikeComment
                    userLike={userLike}
                    refetch={refetch}
                    user={user}
                  />
                ) : (
                  <Link to="#" className="ml-1">
                    <i className="text-secondary far fa-thumbs-down" />
                  </Link>
                )}
              </Fragment>
            );
          }}
        </CQuery>
      </Fragment>
    );
  }
}

export default LikesFeed;
