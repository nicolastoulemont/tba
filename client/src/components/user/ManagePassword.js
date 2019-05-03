import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { InputField } from '../commons/InputComponents';
import { Spring } from 'react-spring/renderprops';

const ManagePassword = ({ user }) => {
	const [showChangePassword, setShowChangePassword] = useState(false);
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [newPassword2, setNewPassword2] = useState('');

	const changePassword = () => {
		console.log(currentPassword);
		console.log(newPassword);
		console.log(newPassword2);
	};

	return (
		<Fragment>
			<div className="row">
				<div className="col-md-8">
					<h6 className="text-left pt-2">Change Password</h6>
					<small className="d-block text-left text-muted pb-2">
						Must be between 5 and 25 characters
					</small>
				</div>
				<div className="col-md-4">
					<Link
						to="#"
						data-togggle="tooltip"
						data-placement="bottom"
						title="Change your email"
						onClick={e => setShowChangePassword(!showChangePassword)}
						className="btn btn-blue mt-2 float-right"
					>
						<h6 className="d-inline font-weight-bold text-uppercase ">Change</h6>
					</Link>
				</div>
			</div>
			{showChangePassword ? (
				<Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
					{props => (
						<div style={props}>
							<div className="row mt-2">
								<div className="col">
									<InputField
										type="password"
										name="currentpassword"
										value={currentPassword}
										labelText="Your current Password"
										placeholder="Enter your current password"
										onChange={e => setCurrentPassword(e.target.value)}
										min={1}
										max={140}
									/>
									<InputField
										type="password"
										name="newpassword"
										value={newPassword}
										labelText="Your new Password"
										placeholder="Enter your new password"
										onChange={e => setNewPassword(e.target.value)}
										min={1}
										max={140}
									/>
									<InputField
										type="password"
										name="newpassword2"
										value={newPassword2}
										labelText="Confirm your new password"
										placeholder="Confirm your new password"
										onChange={e => setNewPassword2(e.target.value)}
										min={1}
										max={140}
									/>
									<Link
										to="#"
										data-togggle="tooltip"
										data-placement="bottom"
										title="Change your email"
										onClick={e => changePassword()}
										className="btn btn-blue float-right mb-2"
									>
										<p className="d-inline font-weight-bold text-uppercase ">Change your email</p>
									</Link>
								</div>
							</div>
						</div>
					)}
				</Spring>
			) : null}
		</Fragment>
	);
};

export default ManagePassword;
