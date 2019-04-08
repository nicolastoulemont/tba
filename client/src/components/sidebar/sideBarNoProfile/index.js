import React from 'react';
import { Link } from 'react-router-dom';

export default function SBNoProfile({ user }) {
	return (
		<div className="col pr-0 mx-auto">
			<div className="mb-4 ml-2 border-0 bg-darkblue">
				<div className="py-4 border-0">
					<div className="row">
						<div className="mx-auto">
							<Link
								to={`/home/profile/create/${user.id}`}
								className="btn btn-outline-light d-block"
							>
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
