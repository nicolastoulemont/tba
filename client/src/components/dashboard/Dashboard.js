import React, { Fragment } from 'react';
import CQuery from '../commons/CustomQueryComponent';
import { LOGGED_USER } from '../graphql/user/Queries';
import DashboardFeed from './DashboardFeed';
import DashboardProfile from './DashboardProfile';
import DashboardUserEvents from './DashboardUserEvents';

const Dashboard = () => {
  return (
    <Fragment>
      <CQuery query={LOGGED_USER} fetchPolicy="network-only">
        {({ data }) => {
          const user = data.currentuser[0];
          return (
            <Fragment key={user.id}>
              <div className="mt-2 text-center">
                <div className="row">
                  <div className="col-sm-12 col-lg-8 bg-white">
                    <DashboardFeed
                      user={user.id}
                      interestOne={user.profile[0].interestOne}
                      interestTwo={user.profile[0].interestTwo}
                      interestThree={user.profile[0].interestThree}
                    />
                  </div>
                  <div className="d-none d-lg-block col-lg-4 text-center">
                    <DashboardProfile
                      user={user.id}
                      avatar={user.avatar}
                      name={user.profile[0].name}
                    />
                    <div className="row">
                      <DashboardUserEvents user={user.id} />
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
