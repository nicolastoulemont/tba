import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { InputField } from '../commons/InputComponents';
import { Spring } from 'react-spring/renderprops';

const DeleteAccount = ({ user }) => {
	const [showDeleteAccount, setShowDeleteAccount] = useState(false);
	const [email, setEmail] = useState('');
	const [currentPassword, setCurrentPassword] = useState('');

	const deleteAccount = () => {
		console.log(email);
		console.log(currentPassword);
	};

	return (
		<Fragment>
			<div className="row">
				<div className="col-md-8">
					<h6 className="text-left pt-2">Delete Account</h6>
					<small className="d-block text-left text-muted">This action is irreversible</small>
				</div>
				<div className="col-md-4">
					<Link
						to="#"
						data-togggle="tooltip"
						data-placement="bottom"
						title="Change your email"
						onClick={e => setShowDeleteAccount(!showDeleteAccount)}
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
										min={1}
										max={140}
									/>
									<Link
										to="#"
										data-togggle="tooltip"
										data-placement="bottom"
										title="Change your email"
										onClick={e => deleteAccount()}
										className="btn btn-blue float-right mb-2"
									>
										<p className="d-inline font-weight-bold text-uppercase ">Delete your account</p>
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

export default DeleteAccount;
