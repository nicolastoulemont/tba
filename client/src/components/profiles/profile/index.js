import React, { Fragment } from 'react';
import CQuery from '../../commons/CustomQueryComponent';
import ProfileHeader from './profileHeader/index';
import ProfileSocial from './profileSocial/index';
import { GET_USER_FULL_PROFILE } from '../../graphql/profile/Queries';
import { ProfileContext } from '../../contexts';

const Profile = ({
	match: {
		params: { id }
	}
}) => {
	return (
		<Fragment>
			<CQuery query={GET_USER_FULL_PROFILE} variables={{ id }}>
				{({ data: { user } }) => {
					const profile = user.profile;
					return (
						<Fragment key={profile.id}>
							<ProfileContext.Provider value={profile}>
								<ProfileHeader />
								<ProfileSocial />
							</ProfileContext.Provider>
						</Fragment>
					);
				}}
			</CQuery>
		</Fragment>
	);
};

export default Profile;
