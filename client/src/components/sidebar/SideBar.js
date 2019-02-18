import React, { Component } from 'react';
import { SideBarLink } from './SideBarLinks';

class SideBar extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="col bg-white mt-4 rounded">
        <ul className="nav flex-column my-4">
          <SideBarLink
            name="Dashboard"
            target={{
              pathname: '/dashboard',
              state: { user }
            }}
            user={user}
            icon="fa fa-home mr-2"
          />
          <SideBarLink
            name="My Profile"
            target={{
              pathname: `/profile/${user}`,
              state: { user }
            }}
            user={user}
            icon="fa fa-user mr-2"
          />
          <SideBarLink
            name="My Events"
            target={{
              pathname: `/myevents/${user}`,
              state: { user }
            }}
            user={user}
            icon="fa fa-users mr-1"
          />
          <SideBarLink
            name="Create Event"
            target={{
              pathname: '/create-event',
              state: { user }
            }}
            user={user}
            icon="fa fa-plus mr-2"
          />
          <SideBarLink
            name="Create Post"
            target={{
              pathname: '/create-post',
              state: { user }
            }}
            user={user}
            icon="fa fa-plus mr-2"
          />
        </ul>
      </div>
    );
  }
}

export default SideBar;
