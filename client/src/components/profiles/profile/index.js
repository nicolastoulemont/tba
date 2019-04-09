import React, { Fragment } from 'react';
import CQuery from '../../commons/CustomQueryComponent';
import ProfileHeader from './profileHeader/index';
import ProfileSocial from './profileSocial/index';
import { GET_USER_FULL_PROFILE } from '../../graphql/profile/Queries';

const Profile = ({ match, currentUser }) => {
	const targetUser = match.params.id;
	return (
		<Fragment key={currentUser}>
			<CQuery query={GET_USER_FULL_PROFILE} variables={{ id: targetUser }}>
				{({ data: { user } }) => {
					const profile = user.profile;
					return (
						<Fragment key={profile.id}>
							<ProfileHeader user_ID={user.id} loggedInUser={currentUser} profile={profile} />
							<ProfileSocial user={user.id} name={profile.name} />
						</Fragment>
					);
				}}
			</CQuery>
		</Fragment>
	);
};

export default Profile;
