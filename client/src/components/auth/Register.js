import dayjs from 'dayjs';
import React, { Fragment, useState } from 'react';
import { Mutation, withApollo } from 'react-apollo';
import { Link } from 'react-router-dom';
import { InputField } from '../commons/InputComponents';
import { REGISTER_AND_LOGIN_USER } from '../graphql/user/Mutations';
import { findErrorInErrorsArr } from '../commons/ErrorsHandling';
import TermsModal from './TermsModal';

const Register = props => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [acceptTerms, setAcceptTerms] = useState(false);
	const [errors, setErrors] = useState([]);

	const onChange = e => {
		if (errors) setErrors(errors.filter(error => error.path !== e.target.name));
		if (e.target.name === 'password') setPassword(e.target.value);
		if (e.target.name === 'password2') setPassword2(e.target.value);
		if (e.target.name === 'acceptTerms') setAcceptTerms(!acceptTerms);
		if (e.target.name === 'email') setEmail(e.target.value.toLowerCase());
	};

	const registerAndLoginUser = async (e, email, password, registerAndLogin) => {
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
			const response = await registerAndLogin({
				variables: { email, password }
			});
			const { ok, token, errors } = response.data.registerAndLogin;
			if (!ok) {
				setErrors(errors);
			} else {
				props.client.resetStore();
				await localStorage.setItem('token', token);
				setTimeout(() => props.history.push(`/home/news/${dayjs().format('YYYY-MM-DD')}`), 50);
			}
		}
	};
	return (
		<Fragment>
			<div className="col p-4">
				<h6 className="text-left text-muted">Create your MyEU account</h6>
				<Mutation mutation={REGISTER_AND_LOGIN_USER}>
					{(registerAndLogin, e) => (
						<form onSubmit={e => registerAndLoginUser(e, email, password, registerAndLogin)}>
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
											className="ml-1 text-blue"
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
									<small className="d-block text-danger text-left">
										{findErrorInErrorsArr(errors, 'acceptTerms').message}
									</small>
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
