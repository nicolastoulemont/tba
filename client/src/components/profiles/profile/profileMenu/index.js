import React from 'react';
import { Link } from 'react-router-dom';

export default function ProfileMenu({ profile, user_ID }) {
	return (
		<div className="text-right mt-0 mr-2">
			<Link
				className="far fa-edit mr-2 text-white"
				data-togggle="tooltip"
				data-placement="bottom"
				title="Edit your profile"
				to={`/home/profile/edit/${user_ID}`}
			/>
		</div>
	);
}
