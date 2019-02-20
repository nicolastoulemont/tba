import React from 'react';

const Spinner = () => {
  return (
    <div className="mx-auto my-4">
      <div className="lds-roller text-center">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Spinner;
