import React, { Fragment } from 'react';
import EventCommentsFeed from '../../comments/EventCommentsFeed';
import LikesFeed from '../../likes/LikesFeed';

const EventSocial = ({ user, eventId }) => {
  return (
    <Fragment>
      <div className="mb-3 pb-5">
        <div className="row px-4">
          <div className="col-6">
            <LikesFeed user={user} eventId={eventId} />
          </div>
          <div className="col-6">
            <div className="text-right align-middle">Register btn</div>
          </div>
        </div>
        <hr />
        <EventCommentsFeed user={user} eventId={eventId} />
      </div>
    </Fragment>
  );
};

export default EventSocial;
