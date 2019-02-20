import React, { Fragment, Component } from 'react';
import EventCommentInput from './EventCommentInput';
import EventCommentItem from './EventCommentItem';
import CQuery from '../commons/CustomQueryComponent';
import { GET_EVENT_COMMENTS } from '../graphql/comment/Queries';

class EventCommentsFeed extends Component {
  render() {
    const { eventId, user } = this.props;
    return (
      <Fragment>
        <div className="align-middle">
          <CQuery query={GET_EVENT_COMMENTS} variables={{ id: eventId }}>
            {({ data: { event }, refetch }) => {
              const comments = event.comments;
              return (
                <Fragment>
                  <ul className="list-group">
                    {comments.map(comment => (
                      <EventCommentItem
                        key={comment.id}
                        id={comment.id}
                        text={comment.text}
                        creatorName={comment.creator.profile.name}
                        creatorId={comment.userId}
                        creatorAvatar={comment.creator.avatar}
                        refetch={refetch}
                        user={user}
                      />
                    ))}
                  </ul>
                  <div className="input-group input-group-sm mt-2 mx-0">
                    <br />
                    <EventCommentInput
                      user={user}
                      eventId={eventId}
                      refetch={refetch}
                    />
                  </div>
                </Fragment>
              );
            }}
          </CQuery>
        </div>
      </Fragment>
    );
  }
}

export default EventCommentsFeed;
