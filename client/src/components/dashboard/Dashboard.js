import React, { Fragment } from 'react';
import CQuery from '../commons/CustomQueryComponent';
import { LOGGED_USER } from '../graphql/user/Queries';
import DashboardFeed from './DashboardFeed';
import SideBarUserProfile from '../profile/SideBarUserProfile';
import SideBarUserEvents from '../events/sideBarUserEvents/SideBarUserEvents';

const Dashboard = () => {
  return (
    <Fragment>
      <CQuery query={LOGGED_USER}>
        {({ data }) => {
          const user = data.currentuser;
          return (
            <Fragment>
              <div className="mt-2 text-center">
                <div className="row">
                  <div className="col-sm-12 col-lg-8 bg-white">
                    <DashboardFeed
                      user={user.id}
                      interestOne={user.profile.interestOne}
                      interestTwo={user.profile.interestTwo}
                      interestThree={user.profile.interestThree}
                    />
                  </div>
                  <div className="d-none d-lg-block col-lg-4 text-center">
                    <SideBarUserProfile
                      user={user.id}
                      avatar={user.avatar}
                      name={user.profile.name}
                    />
                    <div className="row">
                      <SideBarUserEvents user={user.id} />
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          );
        }}
      </CQuery>
    </Fragment>
  );
};

export default Dashboard;
