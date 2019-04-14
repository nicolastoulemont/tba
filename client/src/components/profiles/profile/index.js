import React, { Fragment } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { FetchError } from '../../commons/UserActionsComponents';
import { ProfileContext } from '../../contexts';
import { GET_USER_FULL_PROFILE } from '../../graphql/profile/Queries';
import ProfileHeader from './profileHeader/index';
import ProfileSocial from './profileSocial/index';

const Profile = ({ match }) => {
	const { data, error } = useQuery(GET_USER_FULL_PROFILE, {
		variables: { id: match.params.id },
		suspend: true
	});
	if (error) return <FetchError />;
	return (
		<Fragment key={data.user.profile.id}>
			<ProfileContext.Provider value={data.user.profile}>
				<ProfileHeader />
				<ProfileSocial />
			</ProfileContext.Provider>
		</Fragment>
	);
};

export default Profile;
