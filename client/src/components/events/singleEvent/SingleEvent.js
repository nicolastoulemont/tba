import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { DashboardError } from '../../commons/UserActionsComponents';
import Spinner from '../../commons/Spinner';
import DashboardProfile from '../../dashboard/DashboardProfile';
import DashboardUserEvents from '../../dashboard/DashboardUserEvents';
import Event from './Event';

import { LOGGED_USER } from '../../graphql/user/Queries';

const SingleEvent = ({ match, history }) => {
  const eventId = match.params.id;
  return (
    <Fragment>
      <Query query={LOGGED_USER}>
        {({ loading, error, data }) => {
          if (loading) return <Spinner />;
          if (error) return <DashboardError />;
          if (data) {
            const user = data.currentuser;
            return (
              <Fragment key={user.id}>
                <div className="mt-2 text-center">
                  <div className="row justify-content-center">
                    <div className="col-sm-12 col-lg-8 bg-white px-0">
                      <Event
                        user={user.id}
                        eventId={eventId}
                        history={history}
                      />
                    </div>
                    <div className="d-none d-lg-block col-lg-4 text-center">
                      <DashboardProfile
                        user={user.id}
                        avatar={user.avatar}
                        name={user.profile.name}
                      />
                      <div className="row">
                        <DashboardUserEvents user={user.id} />
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            );
          }
        }}
      </Query>
    </Fragment>
  );
};

export default SingleEvent;
