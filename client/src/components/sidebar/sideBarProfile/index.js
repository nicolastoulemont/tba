import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts';

const SBProfile = () => {
	const {
		id,
		profile: { picture_URL, name }
	} = useContext(UserContext);
	return (
		<div className="col pr-0 mx-auto">
			<div className="mb-4 ml-2 bg-darkblue">
				<div className="py-4">
					<Link to={{ pathname: `/home/profile/${id}` }} className="d-inline mr-2">
						{picture_URL ? (
							<img className="rounded-circle medium-avatar" src={picture_URL} alt="User Avatar" />
						) : (
							<i className="fas fa-user-astronaut fa-3x" />
						)}
					</Link>
					<p className="d-inline text-left text-white font-weight-bold align-middle ml-2">{name}</p>
					<span className="wrp">
						<Link to="#" className="d-inline text-white ml-4 align-middle settings">
							<i className="fas fa-cog p-2 border align-middle rounded-circle settings-child" />
						</Link>
					</span>
				</div>
			</div>
		</div>
	);
};

export default SBProfile;
