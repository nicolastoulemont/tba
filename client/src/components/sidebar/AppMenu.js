import React from 'react';
import { Link } from 'react-router-dom';
import LogOutAction from './LogOutAction';

const AppMenu = ({ user, history }) => {
  return (
    <div className="dropdown">
      <Link
        to="#"
        className="fa fa-bars fa-2x pr-3"
        id="dropdownMenuButton"
        data-toggle="dropdown"
      />
      <div className="dropdown-menu dropdown-menu-right text-justify">
        <Link
          to={{
            pathname: '/dashboard',
            state: { user }
          }}
          className="dropdown-item mx-0 pl-1 "
        >
          <i className="fa fa-home mr-3" /> Dashboard
        </Link>
        <div className="dropdown-divider" />
        <Link
          to={{ pathname: `/profile/${user}`, state: { user } }}
          className="dropdown-item mx-0 pl-1"
        >
          <i className="fa fa-user mr-3" /> My Profile
        </Link>
        <div className="dropdown-divider " />
        <Link
          to={{ pathname: `/myevents/${user}`, state: { user } }}
          className="dropdown-item mx-0 pl-1"
        >
          <i className="fa fa-users mr-2" />
          My Events
        </Link>
        <div className="dropdown-divider" />
        <Link
          to={{ pathname: '/create-event', state: { user } }}
          className="dropdown-item mx-0 pl-1"
        >
          <i className="fa fa-plus mr-2" /> Create Event
        </Link>
        <div className="dropdown-divider" />
        <Link
          to={{ pathname: '/create-post', state: { user } }}
          className="dropdown-item mx-0 pl-1"
        >
          <i className="fa fa-plus mr-2" /> Create Post
        </Link>
        <div className="dropdown-divider" />
        <LogOutAction
          name="Log Out"
          target="/login"
          history={history}
          icon="fa fa-power-off mr-2"
        />
      </div>
    </div>
  );
};

export default AppMenu;
