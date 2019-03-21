import React from 'react';
import { Link } from 'react-router-dom';

const NewsFeedItem = ({
  event_ID,
  user_ID,
  currentUser,
  name,
  category,
  location
}) => {
  return (
    <div className="flex-column align-items-start p-2 border-top" key={event_ID}>
      <div className="d-flex w-100 justify-content-between my-2">
        <h6 className="font-weight-bold mb-2">{name}</h6>
        <small>{location}</small>
      </div>
      <div className="d-flex w-100 justify-content-between">
        <small className="mb-2 font-weight-light">{category}</small>
        <Link
          to={{
            pathname: `/event/${event_ID}`,
            state: { currentUser, user_ID }
          }}
        >
          <small className="text-darkblue font-italic">See more</small>
        </Link>
      </div>
    </div>
  );
};

export default NewsFeedItem;
