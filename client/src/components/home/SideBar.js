import React from 'react';
import { Link } from 'react-router-dom';
import SideBarUserProfile from '../profile/SideBarUserProfile';
import SideBarUserEvents from '../events/sideBarUserEvents/SideBarUserEvents';

export default function SideBar({ user }) {
	if (!user.profile) {
		return (
			<div className="d-none d-lg-block col-lg-4 text-center">
				<div className="row">
					<Link to={`/home/profile/create/${user.id}`}>
						<p>Create your profile to register and likes events and post comments</p>
					</Link>
				</div>
			</div>
		);
	}
	return (
		<div className="d-none d-lg-block col-lg-4 text-center">
			<div className="row">
				<SideBarUserProfile
					avatar={user.profile.picture_URL}
					name={user.profile.name}
					user={user.id}
				/>
			</div>
			<div className="row">
				<SideBarUserEvents user={user.id} />
			</div>
		</div>
	);
}
