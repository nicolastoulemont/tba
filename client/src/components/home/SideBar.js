import React from 'react';
import SideBarUserProfile from '../profile/SideBarUserProfile';
import SideBarUserEvents from '../events/sideBarUserEvents/SideBarUserEvents';

export default function SideBar({ user, avatar, name }) {
	return (
		<div className="d-none d-lg-block col-lg-4 text-center">
			<SideBarUserProfile avatar={avatar} name={name} user={user} />
			<div className="row">
				<SideBarUserEvents user={user} />
			</div>
		</div>
	);
}
