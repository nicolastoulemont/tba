import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts';

export default function SBNoProfile() {
	const { id } = useContext(UserContext);
	return (
		<div className="col pr-0 mx-auto">
			<div className="mb-4 ml-2 border-0 bg-darkblue">
				<div className="py-4 border-0">
					<div className="row">
						<div className="mx-auto">
							<Link to={`/home/profile/create/${id}`} className="btn btn-outline-light d-block">
								Create your profile
							</Link>
							<small className="text-white d-block">
								To register, likes events and post comments
							</small>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
