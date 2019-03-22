import React from 'react';
import { Link } from 'react-router-dom';

const SideBarUserProfile = ({ user, avatar, name }) => {
	return (
		<div className="row">
			<div className="col pr-0 mx-auto">
				<div className="mb-4 ml-2 border-0 bg-darkblue">
					<div className="py-4 border-0">
						<div className="row">
							<div className="col-md-4 px-0">
								<Link to={{ pathname: `/home/profile/${user}` }}>
									{avatar ? (
										<img
											className="rounded-circle border-avatar medium-avatar"
											src={avatar}
											alt="User Avatar"
										/>
									) : (
										<i className="fas fa-user-astronaut fa-3x" />
									)}
								</Link>
							</div>
							<div className="col-md-8 my-auto px-0">
								<p className="text-left text-white font-weight-bold align-middle mb-0 mr-2">
									{name}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SideBarUserProfile;
