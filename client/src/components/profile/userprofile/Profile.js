import React, { Fragment } from 'react';
import CQuery from '../../commons/CustomQueryComponent';
import ProfileHeader from './ProfileHeader';
import ProfileSocial from './ProfileSocial';
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
							<ProfileHeader
								user_ID={user.id}
								loggedInUser={currentUser}
								profile_ID={profile.id}
								picture_URL={profile.picture_URL}
								name={profile.name}
								position={profile.position}
								organisation={profile.organisation}
								interestOne={profile.interestOne}
								interestTwo={profile.interestTwo}
								interestThree={profile.interestThree}
								bio={profile.bio}
								twitter_URL={profile.twitter_URL}
								linkedin_URL={profile.linkedin_URL}
							/>
							<ProfileSocial user={user.id} name={profile.name} />
						</Fragment>
					);
				}}
			</CQuery>
		</Fragment>
	);
};

export default Profile;
