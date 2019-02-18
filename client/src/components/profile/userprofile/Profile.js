import React, { Component, Fragment } from 'react';
import CQuery from '../../commons/CustomQueryComponent';
import DashboardProfile from '../../dashboard/DashboardProfile';
import DashboardUserEvents from '../../dashboard/DashboardUserEvents';
import ProfileHeader from './ProfileHeader';
import ProfileSocial from './ProfileSocial';

import { LOGGED_USER } from '../../graphql/user/Queries';
import { GET_USER_FULL_PROFILE } from '../../graphql/profile/Queries';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.match.params.id
    };
  }

  render() {
    const { user } = this.state;
    return (
      <Fragment>
        <CQuery query={LOGGED_USER}>
          {({ data }) => {
            const loggedInUser = data.currentuser[0];
            return (
              <Fragment key={loggedInUser.id}>
                <div className="mt-2 text-center">
                  <div className="row justify-content-center">
                    <div className="col-sm-12 col-lg-8 bg-white px-0">
                      <CQuery
                        query={GET_USER_FULL_PROFILE}
                        variables={{ id: user }}
                      >
                        {({ data: { user } }) => {
                          const profile = user.profile[0];
                          return (
                            <Fragment key={profile.id}>
                              <ProfileHeader
                                userId={user.id}
                                loggedInUser={loggedInUser.id}
                                profileId={profile.id}
                                avatar={user.avatar}
                                name={profile.name}
                                position={profile.position}
                                organisation={profile.organisation}
                                interestOne={profile.interestOne}
                                interestTwo={profile.interestTwo}
                                interestThree={profile.interestThree}
                                bio={profile.bio}
                                twitter={profile.twitter}
                                linkedin={profile.linkedin}
                              />
                              <ProfileSocial
                                user={user.id}
                                name={profile.name}
                              />
                            </Fragment>
                          );
                        }}
                      </CQuery>
                    </div>
                    <div className="d-none d-lg-block col-lg-4 text-center">
                      <DashboardProfile
                        avatar={loggedInUser.avatar}
                        name={loggedInUser.profile[0].name}
                        user={loggedInUser.id}
                      />
                      <div className="row">
                        <DashboardUserEvents user={loggedInUser.id} />
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
  }
}

export default Profile;
