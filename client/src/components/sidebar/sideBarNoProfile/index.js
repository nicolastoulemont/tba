import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts';

const SBNoProfile = () => {
	const { id } = useContext(UserContext);
	return (
		<div className="col pr-0 mx-auto">
			<div className="mb-4 ml-2 border-0 bg-white">
				<div className="row">
					<div className="col px-4 py-2">
						<h6 className="px-4 pt-2 text-left">
							Reminder to{' '}
							<Link to={`/home/profile/create/${id}`} className="font-weight-bold text-blue">
								create your profile
							</Link>
						</h6>
						<div className="px-4 text-left">
							<span>
								<small className="font-weight-bold text-muted">In order to :</small>
							</span>
							<ul className="pl-2">
								<li>
									<small>Register and likes events</small>
								</li>
								<li>
									<small>Post comments</small>
								</li>
								<li>
									<small>Publish events</small>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SBNoProfile;
