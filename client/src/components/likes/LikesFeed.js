import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { LikeEvent, UnlikeEvent } from './LikeActions';
import CQuery from '../commons/CustomQueryComponent';
import { GET_EVENT_LIKES } from '../graphql/likes/Queries';

class LikesFeed extends Component {
  getUserLikeId = (likes, user) => {
    let userLikeObj = likes.find(like => like.userId === user);
    return userLikeObj;
  };
  render() {
    const { user, eventId } = this.props;
    return (
      <Fragment>
        <CQuery query={GET_EVENT_LIKES} variables={{ id: eventId }}>
          {({
            data: {
              event: { likes }
            },
            refetch
          }) => {
            let userLike = this.getUserLikeId(likes, user);
            return (
              <Fragment>
                <div className="text-left align-middle">
                  {typeof userLike === 'undefined' ? (
                    <LikeEvent
                      user={user}
                      eventId={eventId}
                      refetch={refetch}
                    />
                  ) : (
                    <Link to="#" className="mr-1">
                      <i className="text-darkblue fa fa-thumbs-up" />
                    </Link>
                  )}
                  <span className="mx-2">{likes.length}</span>
                  {typeof userLike !== 'undefined' ? (
                    <UnlikeEvent userLike={userLike} refetch={refetch} />
                  ) : (
                    <Link to="#" className="ml-2">
                      <i className="text-secondary far fa-thumbs-down" />
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

export default LikesFeed;
