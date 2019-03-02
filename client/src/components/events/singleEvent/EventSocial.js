import React, { Fragment } from 'react';
import RegistrationFeed from '../../registrations/RegistrationFeed';
import EventSocialSelector from './EventSocialSelector';

const EventSocial = ({ user, eventId }) => {
  return (
    <Fragment>
      <div className="mb-3 pb-5">
        <div className="row pl-2 pr-4 pb-2">
          <div className="col-6" />
          <div className="col-6">
            <RegistrationFeed user={user} eventId={eventId} />
          </div>
        </div>
        <EventSocialSelector user={user} eventId={eventId} />
      </div>
    </Fragment>
  );
};

export default EventSocial;
