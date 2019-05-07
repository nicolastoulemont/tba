import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { InputField } from '../commons/InputComponents';
import { Spring } from 'react-spring/renderprops';
import { findErrorInErrorsArr } from '../commons/ErrorsHandling';
import { DELETE_USER_ACCOUNT } from '../graphql/user/Mutations';

const DeleteAccount = ({ user, history }) => {
	const [showDeleteAccount, setShowDeleteAccount] = useState(false);
	const [email, setEmail] = useState('');
	const [currentPassword, setCurrentPassword] = useState('');
	const [errors, setErrors] = useState([]);

	const showChangeDeleteAccountForm = () => {
		setErrors([]);
		setCurrentPassword('');
		setEmail('');
		setShowDeleteAccount(!showDeleteAccount);
	};

	const accountDelete = async (deleteAccount, e) => {
		e.preventDefault();
		const res = await deleteAccount({
			variables: { user_ID: user.id, email, password: currentPassword }
		});
		const { ok, errors } = res.data.deleteAccount;
		if (!ok) setErrors(errors);
		if (ok) {
			localStorage.removeItem('token');
			history.push('/');
		}
	};
	return (
		<Fragment>
			<div className="row">
				<div className="col-8">
					<h6 className="text-left pt-2">Delete Account</h6>
					<small className="d-block text-left text-muted">This action is irreversible</small>
				</div>
				<div className="col-4">
					<Link
						to="#"
						data-togggle="tooltip"
						data-placement="bottom"
						title="Change your email"
						onClick={showChangeDeleteAccountForm}
						className="btn btn-blue mt-2 float-right"
					>
						<h6 className="d-inline font-weight-bold text-uppercase ">Delete</h6>
					</Link>
				</div>
			</div>
			{showDeleteAccount ? (
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
										placeholder="Enter your email address"
										onChange={e => setEmail(e.target.value)}
										error={findErrorInErrorsArr(errors, 'email')}
										min={1}
										max={140}
									/>
									<InputField
										type="password"
										name="currentpassword"
										value={currentPassword}
										labelText="Current password"
										placeholder="Enter your current password"
										onChange={e => setCurrentPassword(e.target.value)}
										error={findErrorInErrorsArr(errors, 'password')}
										min={1}
										max={140}
									/>
									<Mutation mutation={DELETE_USER_ACCOUNT}>
										{(deleteAccount, e) => (
											<Link
												to="#"
												data-togggle="tooltip"
												data-placement="bottom"
												title="Change your email"
												onClick={e => accountDelete(deleteAccount, e)}
												className="btn btn-blue float-right mb-2"
											>
												<p className="d-inline font-weight-bold text-uppercase ">
													Delete your account
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

export default DeleteAccount;
