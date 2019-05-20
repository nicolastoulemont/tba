import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { PUBLIC_EVENT_REGISTRATION } from '../../graphql/user/Mutations';
import { EventContext } from '../../contexts';
import { InputField } from '../../commons/InputComponents';
import { findErrorInErrorsArr } from '../../commons/ErrorsHandling';
import TermsModal from '../../auth/TermsModal';

const EventRegistration = () => {
	const event = useContext(EventContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [acceptTerms, setAcceptTerms] = useState(false);
	const [name, setName] = useState('');
	const [position, setPosition] = useState('');
	const [organisation, setOrganisation] = useState('');
	const [errors, setErrors] = useState([]);
	const [success, setSuccess] = useState(false);

	const onChange = e => {
		if (errors) setErrors(errors.filter(error => error.path !== e.target.name));
		if (e.target.name === 'password') setPassword(e.target.value);
		if (e.target.name === 'password2') setPassword2(e.target.value);
		if (e.target.name === 'acceptTerms') setAcceptTerms(!acceptTerms);
		if (e.target.name === 'name') setName(e.target.value);
		if (e.target.name === 'position') setPosition(e.target.value);
		if (e.target.name === 'organisation') setOrganisation(e.target.value);
		if (e.target.name === 'email') setEmail(e.target.value.toLowerCase());
	};

	const createPublicEventRegistration = async (e, publicEventRegistration) => {
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
			const response = await publicEventRegistration({
				variables: {
					email,
					password,
					name,
					position,
					organisation,
					eventName: event.name,
					eventCity: event.city,
					eventAddress: event.address,
					eventStart: event.start,
					eventEnd: event.end,
					event_ID: event.id
				}
			});
			console.log(response);
			const { ok, errors, accessToken, refreshToken } = response.data.publicEventRegistration;
			if (!ok) {
				setErrors(errors);
			} else {
				localStorage.removeItem('access-token');
				localStorage.removeItem('refresh-token');
				localStorage.setItem('access-token', accessToken);
				localStorage.setItem('refresh-token', refreshToken);
				setSuccess(true);
			}
		}
	};

	return (
		<div className="py-2 px-4">
			<h5 className="text-left">Register</h5>
			<Mutation mutation={PUBLIC_EVENT_REGISTRATION}>
				{(publicEventRegistration, e) => (
					<form onSubmit={async e => createPublicEventRegistration(e, publicEventRegistration)}>
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
							type="text"
							placeholder="e.g. Frederic Von Brexit"
							name="name"
							labelText="Name"
							value={name}
							onChange={onChange}
							error={findErrorInErrorsArr(errors, 'name')}
							min={1}
							max={70}
						/>
						<InputField
							type="text"
							placeholder="e.g. Policy Officer / Citizen"
							name="position"
							labelText="Position"
							value={position}
							onChange={onChange}
							error={findErrorInErrorsArr(errors, 'position')}
							max={70}
						/>
						<InputField
							type="text"
							name="organisation"
							placeholder="Your employer"
							labelText="Organisation"
							value={organisation}
							onChange={onChange}
							error={findErrorInErrorsArr(errors, 'organisation')}
							max={70}
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
						</div>
						{success ? (
							<div className="text-left">
								<small className="d-block text-success">
									You have successfully registered, a confirmation email has been sent to your email
									address
								</small>
							</div>
						) : null}
						<input type="submit" className="btn bg-blue text-white btn-block my-4" />
					</form>
				)}
			</Mutation>

			<TermsModal />
		</div>
	);
};

export default React.memo(EventRegistration);
