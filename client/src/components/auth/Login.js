import dayjs from 'dayjs';
import React, { Fragment, useState } from 'react';
import { Mutation, withApollo } from 'react-apollo';
import { InputField } from '../commons/InputComponents';
import { LOGIN_USER } from '../graphql/user/Mutations';
import { findErrorInErrorsArr } from '../commons/ErrorsHandling';

const Login = ({ history, client }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState([]);

	const onChange = e => {
		if (errors) setErrors(errors.filter(error => error.path !== e.target.name));
		if (e.target.name === 'password') setPassword(e.target.value);
		if (e.target.name === 'email') setEmail(e.target.value.toLowerCase());
	};

	const userLogin = async (e, email, password, login) => {
		e.preventDefault();
		const response = await login({
			variables: { email, password }
		});
		const { ok, errors, accessToken, refreshToken } = response.data.login;
		if (!ok) {
			setErrors(errors);
		} else {
			await client.resetStore();
			localStorage.setItem('access-token', accessToken);
			localStorage.setItem('refresh-token', refreshToken);
			setTimeout(() => history.push(`/home/news/${dayjs().format('YYYY-MM-DD')}`), 50);
		}
	};

	return (
		<Fragment>
			<div className="col p-4">
				<h6 className="text-left text-muted">Login to your account</h6>
				<Mutation mutation={LOGIN_USER}>
					{(login, e) => (
						<form onSubmit={e => userLogin(e, email, password, login)}>
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
								placeholder="Your password"
								name="password"
								value={password}
								onChange={onChange}
								error={findErrorInErrorsArr(errors, 'password')}
							/>
							<input type="submit" className="btn bg-blue text-white btn-block my-4" />
						</form>
					)}
				</Mutation>
			</div>
		</Fragment>
	);
};

export default withApollo(Login);
