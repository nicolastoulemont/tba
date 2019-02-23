import React, { Fragment } from 'react';
import EventCommentDisplay from './EventCommentDisplay';
import CQuery from '../commons/CustomQueryComponent';
import { GET_COMMENT_COMMENTS } from '../graphql/comment/Queries';

const EventCommentItem = ({
  id,
  text,
  creatorName,
  creatorId,
  creatorAvatar,
  refetch,
  user,
  eventId
}) => {
  return (
    <Fragment>
      <EventCommentDisplay
        id={id}
        text={text}
        creatorName={creatorName}
        creatorId={creatorId}
        creatorAvatar={creatorAvatar}
        refetch={refetch}
        user={user}
        eventId={eventId}
      />
      <CQuery query={GET_COMMENT_COMMENTS} variables={{ id }}>
        {({ data: { comment }, refetch }) => {
          const comments = comment.comments;
          if (comments.length === 0) return null;
          return (
            <Fragment>
              <div className="row">
                <div className="col-1" />
                <div className="col-11">
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
                </div>
              </div>
            </Fragment>
          );
        }}
      </CQuery>
    </Fragment>
  );
};

export default EventCommentItem;
