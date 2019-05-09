import dayjs from 'dayjs';
import React, { Fragment, useState } from 'react';
import { Mutation, withApollo } from 'react-apollo';
import { InputField } from '../commons/InputComponents';
import { LOGIN_USER } from '../graphql/user/Mutations';
import { findErrorInErrorsArr } from '../commons/ErrorsHandling';

const Login = props => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState([]);

	const onChange = e => {
		if (errors) setErrors(errors.filter(error => error.path !== e.target.name));
		if (e.target.name === 'password') setPassword(e.target.value);
		if (e.target.name === 'email') setEmail(e.target.value);
	};

	const logIn = async (e, email, password, login) => {
		e.preventDefault();
		const response = await login({
			variables: { email, password }
		});
		const { ok, token, errors } = response.data.login;
		if (!ok) {
			setErrors(errors);
		} else {
			props.client.resetStore();
			localStorage.setItem('token', token);
			setTimeout(() => props.history.push(`/home/news/${dayjs().format('YYYY-MM-DD')}`), 50);
		}
	};

	return (
		<Fragment>
			<div className="col p-4">
				<h6 className="text-left text-muted">Login to your account</h6>
				<Mutation mutation={LOGIN_USER}>
					{(login, e) => (
						<form onSubmit={e => logIn(e, email, password, login)}>
							<InputField
								type="text"
								labelText="Email"
								placeholder="Please enter your email adress"
								name="email"
								value={email}
								onChange={onChange}
								error={findErrorInErrorsArr(errors, 'email')}
							/>
							<InputField
								type="password"
								labelText="Password"
								placeholder="Please enter your password"
								name="password"
								value={password}
								onChange={onChange}
								error={findErrorInErrorsArr(errors, 'password')}
							/>
							<input type="submit" className="btn btn-blue btn-block my-4" />
						</form>
					)}
				</Mutation>
			</div>
		</Fragment>
	);
};

export default withApollo(Login);
