import React from 'react';
import { Spring } from 'react-spring/renderprops';
import CQuery from '../../commons/CustomQueryComponent';
import { ProfileContext } from '../../contexts';
import { GET_USER_FULL_PROFILE } from '../../graphql/profile/Queries';
import ProfileHeader from './';
import ProfileSocial from './profileSocial/index';

const Profile = ({ match }) => {
	return (
		<CQuery query={GET_USER_FULL_PROFILE} variables={{ id: match.params.id }}>
			{({ data }) => {
				return (
					<Spring from={{ opacity: 0 }} to={{ opacity: 1 }} config={{ delay: 400 }}>
						{props => (
							<div style={props}>
								<ProfileContext.Provider value={data.user.profile}>
									<ProfileHeader />
									{!data.user.profile.hideSocial ? <ProfileSocial /> : null}
								</ProfileContext.Provider>
							</div>
						)}
					</Spring>
				);
			}}
		</CQuery>
	);
};

export default Profile;
