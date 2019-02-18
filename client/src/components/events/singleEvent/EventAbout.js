import React from 'react';

const EventAbout = ({ description }) => {
  return (
    <div className="p-4">
      <h5 className="text-left">About</h5>
      <div className="d-flex flex-wrap text-justify align-items-center">
        <p> {description}</p>
      </div>
      <br />
    </div>
  );
};

export default EventAbout;
