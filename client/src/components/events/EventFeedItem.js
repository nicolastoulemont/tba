import React from 'react';
import { Link } from 'react-router-dom';

const EventFeedItem = ({
  eventId,
  userId,
  name,
  creator,
  startDate,
  startTime,
  endDate,
  endTime,
  location
}) => {
  return (
    <div className="p-2 border-top border-bottom" key={eventId}>
      <div className="row">
        <div className="d-none d-md-block col-md-1">
          <Link to={{ pathname: `/profile/${userId}` }}>
            {creator.avatar ? (
              <img
                className="rounded-circle small-avatar mt-2"
                src={creator.avatar}
                alt="User Avatar"
              />
            ) : (
              <i className="fas fa-user-astronaut fa-3x" />
            )}
          </Link>
        </div>
        <div className="col-md-11">
          <div className="d-flex w-100 justify-content-between mt-2">
            <h6 className="font-weight-bold mt-0">
              <Link
                to={{
                  pathname: `/event/${eventId}`
                }}
              >
                {name}
              </Link>
            </h6>
            <small>{location}</small>
          </div>
          <div className="d-flex w-100 justify-content-between">
            <small className="">
              {' '}
              by{' '}
              <Link
                to={{ pathname: `/profile/${userId}` }}
                className="font-weight-bold"
              >
                {creator.profile.name}
              </Link>
              , {creator.profile.position} at {creator.profile.organisation}
            </small>
          </div>
          <div className="d-flex w-100 justify-content-between">
            <div className="mb-2">
              {startDate === endDate ? (
                <small>
                  From {startTime} to {endTime}
                </small>
              ) : (
                <small>
                  On {startDate} from {startTime} to {endTime} on {endDate}
                </small>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventFeedItem;
