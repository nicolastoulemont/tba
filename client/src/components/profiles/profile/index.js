import React, { Fragment } from 'react';
import CQuery from '../../commons/CustomQueryComponent';
import { ProfileContext } from '../../contexts';
import { GET_USER_FULL_PROFILE } from '../../graphql/profile/Queries';
import ProfileHeader from './profileHeader/index';
import ProfileSocial from './profileSocial/index';

const Profile = ({ match }) => {
	return (
		<CQuery query={GET_USER_FULL_PROFILE} variables={{ id: match.params.id }}>
			{({ data }) => {
				return (
					<Fragment key={data.user.profile.id}>
						<ProfileContext.Provider value={data.user.profile}>
							<ProfileHeader />
							{!data.user.profile.hideSocial ? <ProfileSocial /> : null}
						</ProfileContext.Provider>
					</Fragment>
				);
			}}
		</CQuery>
	);
};

export default Profile;
