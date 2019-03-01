import React, { Fragment } from 'react';
import CQuery from '../../commons/CustomQueryComponent';
import SideBarUserProfile from '../SideBarUserProfile';
import SideBarUserEvents from '../../events/sideBarUserEvents/SideBarUserEvents';
import ProfileHeader from './ProfileHeader';
import ProfileSocial from './ProfileSocial';

import { LOGGED_USER } from '../../graphql/user/Queries';
import { GET_USER_FULL_PROFILE } from '../../graphql/profile/Queries';

const Profile = ({ match }) => {
  const user = match.params.id;
  return (
    <Fragment>
      <CQuery query={LOGGED_USER}>
        {({ data }) => {
          const loggedInUser = data.currentuser;
          return (
            <Fragment key={loggedInUser.id}>
              <div className="mt-2 text-center">
                <div className="row justify-content-center">
                  <main className="col-sm-12 col-lg-8 bg-white px-0">
                    <CQuery
                      query={GET_USER_FULL_PROFILE}
                      variables={{ id: user }}
                    >
                      {({ data: { user } }) => {
                        const profile = user.profile;
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
                            <ProfileSocial user={user.id} name={profile.name} />
                          </Fragment>
                        );
                      }}
                    </CQuery>
                  </main>
                  <div className="d-none d-lg-block col-lg-4 text-center">
                    <SideBarUserProfile
                      avatar={loggedInUser.avatar}
                      name={loggedInUser.profile.name}
                      user={loggedInUser.id}
                    />
                    <div className="row">
                      <SideBarUserEvents user={loggedInUser.id} />
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

export default Profile;
