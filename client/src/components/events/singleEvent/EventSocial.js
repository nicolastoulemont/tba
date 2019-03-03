import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import RegistrationFeed from '../../registrations/RegistrationFeed';
import EventSocialSelector from './EventSocialSelector';

import EventReportModal from '../../reports/EventReportModal';

const EventSocial = ({ user, eventId }) => {
  return (
    <Fragment>
      <div className="mb-3 pb-5">
        <div className="row pl-2 pr-4 pb-2">
          <div className="col-6">
            <Link
              className="d-inline"
              to="#"
              data-toggle="modal"
              data-target="#EventReportModal"
            >
              <small>
                <i className="fas fa-flag float-left ml-3" />
              </small>
            </Link>
            <EventReportModal eventId={eventId} />
          </div>

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
