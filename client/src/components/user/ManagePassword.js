import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { InputField } from '../commons/InputComponents';
import { Spring } from 'react-spring/renderprops';
import { CHANGE_USER_PASSWORD } from '../graphql/user/Mutations';
import { findErrorInErrorsArr } from '../commons/ErrorsHandling';

const ManagePassword = ({ user }) => {
	const [showChangePassword, setShowChangePassword] = useState(false);
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [newPassword2, setNewPassword2] = useState('');
	const [success, setSuccess] = useState(false);
	const [errors, setErrors] = useState([]);

	const showChangeEmailForm = () => {
		setSuccess(false);
		setErrors([]);
		setCurrentPassword('');
		setNewPassword('');
		setNewPassword2('');
		setShowChangePassword(!showChangePassword);
	};

	const passwordChange = async (changePassword, e) => {
		e.preventDefault();
		if (newPassword !== newPassword2) {
			setErrors([
				{
					path: 'newpassword',
					message: "Your new password doesn't match the confirmation password"
				},
				{
					path: 'newpassword2',
					message: "Your new password doesn't match the confirmation password"
				}
			]);
			return null;
		} else {
			const res = await changePassword({
				variables: { user_ID: user.id, currentPassword, newPassword }
			});
			const { ok, errors } = res.data.changePassword;
			if (!ok) setErrors(errors);
			if (ok) {
				setSuccess(true);
				setErrors([]);
			}
		}
	};

	return (
		<Fragment>
			<div className="row">
				<div className="col-8">
					<h6 className="text-left pt-2">Change Password</h6>
					<small className="d-block text-left text-muted pb-2">
						Must be between 5 and 25 characters
					</small>
				</div>
				<div className="col-4">
					<Link
						to="#"
						data-togggle="tooltip"
						data-placement="bottom"
						title="Change your password"
						onClick={showChangeEmailForm}
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
										error={findErrorInErrorsArr(errors, 'currentpassword')}
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
										error={findErrorInErrorsArr(errors, 'newpassword')}
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
										error={findErrorInErrorsArr(errors, 'newpassword2')}
										min={1}
										max={140}
									/>
									{success ? (
										<div className="alert alert-success float-left py-1">
											Your password has been updated
										</div>
									) : null}
									<Mutation mutation={CHANGE_USER_PASSWORD}>
										{(changePassword, e) => (
											<Link
												to="#"
												data-togggle="tooltip"
												data-placement="bottom"
												title="Change your email"
												onClick={e => passwordChange(changePassword, e)}
												className="btn btn-blue float-right mb-2"
											>
												<p className="d-inline font-weight-bold text-uppercase ">
													Change your password
												</p>
											</Link>
										)}
									</Mutation>
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
