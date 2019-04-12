import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProfileContext } from '../../../contexts';

const ProfileMenu = () => {
	const profile = useContext(ProfileContext);
	return (
		<div className="text-right mt-0 mr-2">
			<Link
				className="far fa-edit mr-2 text-white"
				data-togggle="tooltip"
				data-placement="bottom"
				title="Edit your profile"
				to={`/home/profile/edit/${profile.user_ID}`}
			/>
		</div>
	);
};

export default ProfileMenu;
