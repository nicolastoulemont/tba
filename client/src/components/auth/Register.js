import React, { Fragment, useState } from 'react';
import { Mutation, withApollo } from 'react-apollo';
import { Link } from 'react-router-dom';
import { InputField } from '../commons/InputComponents';
import { REGISTER_USER } from '../graphql/user/Mutations';
import { findErrorInErrorsArr } from '../commons/ErrorsHandling';
import TermsModal from './TermsModal';

const Register = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [acceptTerms, setAcceptTerms] = useState(false);
	const [errors, setErrors] = useState([]);
	const [success, setSuccess] = useState(false);

	const onChange = e => {
		if (errors) setErrors(errors.filter(error => error.path !== e.target.name));
		if (e.target.name === 'password') setPassword(e.target.value);
		if (e.target.name === 'password2') setPassword2(e.target.value);
		if (e.target.name === 'acceptTerms') setAcceptTerms(!acceptTerms);
		if (e.target.name === 'email') setEmail(e.target.value.toLowerCase());
	};

	const registerUser = async (e, email, password, register) => {
		e.preventDefault();
		if (password !== password2) {
			setErrors([
				{
					path: 'password2',
					message: "Your confirmation password doesn't match your password"
				}
			]);
			return null;
		} else if (!acceptTerms) {
			setErrors([
				{
					path: 'acceptTerms',
					message: 'You must agree to our Terms of server to create an account'
				}
			]);
		} else {
			const response = await register({
				variables: { email, password }
			});
			const { ok, errors } = response.data.register;
			if (!ok) {
				setErrors(errors);
			} else {
				setSuccess(true);
			}
		}
	};
	return (
		<Fragment>
			<div className="col p-4">
				<h6 className="text-left text-muted">Create your MyEU account</h6>
				<Mutation mutation={REGISTER_USER}>
					{(register, e) => (
						<form onSubmit={e => registerUser(e, email, password, register)}>
							<InputField
								type="text"
								labelText="Email"
								placeholder="Your email address"
								name="email"
								value={email}
								onChange={onChange}
								error={findErrorInErrorsArr(errors, 'email')}
							/>
							<InputField
								type="password"
								labelText="Password"
								placeholder="Between 5 and 25 characters"
								name="password"
								value={password}
								onChange={onChange}
								error={findErrorInErrorsArr(errors, 'password')}
								min={5}
								max={25}
							/>
							<InputField
								type="password"
								labelText="Confirm Password"
								placeholder="Between 5 and 25 characters"
								name="password2"
								value={password2}
								onChange={onChange}
								error={findErrorInErrorsArr(errors, 'password2')}
								min={5}
								max={25}
							/>

							<div className="form-check text-left">
								<input
									className="form-check-input"
									type="checkbox"
									id="acceptTermsCheckBox"
									name="acceptTerms"
									value={acceptTerms}
									checked={acceptTerms}
									onChange={onChange}
									error={findErrorInErrorsArr(errors, 'acceptTerms')}
								/>
								<label className="form-check-label text-left" htmlFor="acceptTermsCheckBox">
									<small className="text-muted d-block">
										Creating an account means you agree with our
										<Link
											to="#"
											className="ml-1 font-weight-bold text-blue"
											data-toggle="modal"
											data-target="#TermsOfServiceModal"
											data-togggle="tooltip"
											data-placement="bottom"
											title="Read our Terms of service"
										>
											Terms of Service
										</Link>
									</small>
								</label>
								{findErrorInErrorsArr(errors, 'acceptTerms') ? (
									<div className="text-left">
										<small className="d-block text-danger">
											{findErrorInErrorsArr(errors, 'acceptTerms').message}
										</small>
									</div>
								) : null}
								{success ? (
									<div className="text-left">
										<small className="d-block text-success">
											You have successfully registered, a verification email has been sent to your
											email address
										</small>
									</div>
								) : null}
							</div>
							<input type="submit" className="btn bg-blue text-white btn-block my-4" />
						</form>
					)}
				</Mutation>
			</div>
			<TermsModal />
		</Fragment>
	);
};

export default withApollo(Register);
