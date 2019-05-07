import React, { Fragment, useState } from 'react';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Spring } from 'react-spring/renderprops';
import { InputField } from '../commons/InputComponents';
import { CHANGE_USER_EMAIL } from '../graphql/user/Mutations';
import { LOGGED_USER } from '../graphql/user/Queries';
import { findErrorInErrorsArr } from '../commons/ErrorsHandling';

const ManageEmail = ({ user }) => {
	const [showChangeEmail, setShowChangeEmail] = useState(false);
	const [email, setEmail] = useState('');
	const [currentPassword, setCurrentPassword] = useState('');
	const [success, setSuccess] = useState(false);
	const [errors, setErrors] = useState([]);

	const showChangeEmailForm = () => {
		setSuccess(false);
		setErrors([]);
		setCurrentPassword('');
		setEmail('');
		setShowChangeEmail(!showChangeEmail);
	};

	const emailChange = async (changeEmail, e) => {
		// FIELDS VALIDATION
		e.preventDefault();
		const res = await changeEmail({
			variables: { user_ID: user.id, email, password: currentPassword }
		});
		const { ok, errors } = res.data.changeEmail;
		if (!ok) setErrors(errors);
		if (ok) {
			setSuccess(true);
			setErrors([]);
		}
	};

	return (
		<Fragment>
			<div className="row">
				<div className="col-8">
					<h6 className="text-left pt-2">Email Address</h6>
					<small className="d-block text-left text-muted pb-2">{user.email}</small>
				</div>
				<div className="col-4">
					<Link
						to="#"
						data-togggle="tooltip"
						data-placement="bottom"
						title="Change your email"
						onClick={showChangeEmailForm}
						className="btn btn-blue mt-2 float-right"
					>
						<h6 className="d-inline font-weight-bold text-uppercase ">Change</h6>
					</Link>
				</div>
			</div>
			{showChangeEmail ? (
				<Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
					{props => (
						<div style={props}>
							<div className="row mt-2">
								<div className="col">
									<InputField
										type="text"
										name="email"
										value={email}
										labelText="Email"
										placeholder="Enter your new email address"
										onChange={e => setEmail(e.target.value)}
										error={findErrorInErrorsArr(errors, 'email')}
										min={1}
										max={140}
									/>
									<InputField
										type="password"
										name="currentpassword"
										value={currentPassword}
										labelText="Your password"
										placeholder="Enter your current password"
										onChange={e => setCurrentPassword(e.target.value)}
										error={findErrorInErrorsArr(errors, 'currentpassword')}
										min={1}
										max={140}
									/>
									{success ? (
										<div className="alert alert-success float-left py-1">
											Your Email address has been updated
										</div>
									) : null}
									<Mutation mutation={CHANGE_USER_EMAIL} refetchQueries={[{ query: LOGGED_USER }]}>
										{(changeEmail, e) => (
											<Link
												to="#"
												data-togggle="tooltip"
												data-placement="bottom"
												title="Change your email"
												onClick={e => emailChange(changeEmail, e)}
												className="btn btn-blue float-right mb-2"
											>
												<p className="d-inline font-weight-bold text-uppercase ">
													Change your email
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

export default ManageEmail;
