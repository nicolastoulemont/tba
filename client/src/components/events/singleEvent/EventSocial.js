import React, { Fragment } from 'react';
import EventCommentsFeed from '../../comments/EventCommentsFeed';
import LikesFeed from '../../likes/LikesFeed';
import RegistrationFeed from '../../registrations/RegistrationFeed';

const EventSocial = ({ user, eventId }) => {
  return (
    <Fragment>
      <div className="mb-3 pb-5">
        <div className="row px-4">
          <div className="col-6">
            <LikesFeed user={user} eventId={eventId} />
          </div>
          <div className="col-6">
            <RegistrationFeed user={user} eventId={eventId} />
          </div>
        </div>
        <hr />
        <EventCommentsFeed user={user} eventId={eventId} />
      </div>
    </Fragment>
  );
};

export default EventSocial;
