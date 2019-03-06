import React, { Fragment, Component } from 'react';
import EventCommentFeedInput from './EventCommentFeedInput';
import EventCommentItem from './EventCommentItem';
import CQuery from '../commons/CustomQueryComponent';
import { GET_EVENT_COMMENTS } from '../graphql/comment/Queries';

class EventCommentsFeed extends Component {
  render() {
    const { eventId, user, eventCreator } = this.props;
    return (
      <Fragment>
        <div>
          <CQuery query={GET_EVENT_COMMENTS} variables={{ id: eventId }}>
            {({ data: { event }, refetch }) => {
              const comments = event.comments;
              return (
                <Fragment>
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
                      eventId={eventId}
                      eventCreator={eventCreator}
                      edited={comment.edited}
                      moderated={comment.moderated}
                    />
                  ))}

                  <div className="input-group input-group-sm mt-2 mx-0">
                    <br />
                    <EventCommentFeedInput
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
