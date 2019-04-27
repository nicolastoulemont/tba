import React, { Fragment } from 'react';
import { Spring } from 'react-spring/renderprops';
import CQuery from '../../commons/CustomQueryComponent';
import { ProfileContext } from '../../contexts';
import { GET_USER_FULL_PROFILE } from '../../graphql/profile/Queries';
import ProfileHeader from './profileHeader';
import ProfileSocial from './profileSocial';

const Profile = ({ match }) => {
	return (
		<Fragment>
			<CQuery query={GET_USER_FULL_PROFILE} variables={{ user_ID: match.params.id }}>
				{({ data }) => {
					return (
						<Fragment>
							{data.searchUserProfile.statusCode === 200 ? (
								<Spring from={{ opacity: 0 }} to={{ opacity: 1 }} config={{ delay: 400 }}>
									{props => (
										<div style={props}>
											<ProfileContext.Provider value={data.searchUserProfile.body}>
												<ProfileHeader />
												{data.searchUserProfile.body.hideSocial ? null : <ProfileSocial />}
											</ProfileContext.Provider>
										</div>
									)}
								</Spring>
							) : null}
						</Fragment>
					);
				}}
			</CQuery>
		</Fragment>
	);
};

export default Profile;
