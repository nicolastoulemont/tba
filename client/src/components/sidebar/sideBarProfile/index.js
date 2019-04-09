import React from 'react';
import { Link } from 'react-router-dom';

const SBProfile = ({ user, avatar, name }) => {
	return (
		<div className="col pr-0 mx-auto">
			<div className="mb-4 ml-2 bg-darkblue">
				<div className="py-4">
					<Link to={{ pathname: `/home/profile/${user}` }} className="d-inline mr-2">
						{avatar ? (
							<img className="rounded-circle medium-avatar" src={avatar} alt="User Avatar" />
						) : (
							<i className="fas fa-user-astronaut fa-3x" />
						)}
					</Link>
					<p className="d-inline text-left text-white font-weight-bold align-middle ml-2">{name}</p>
				</div>
			</div>
		</div>
	);
};

export default SBProfile;
