import dayjs from 'dayjs';
import React, { Fragment, useState } from 'react';
import { Mutation, withApollo } from 'react-apollo';
import { InputField } from '../commons/InputComponents';
import { REGISTER_AND_LOGIN_USER } from '../graphql/user/Mutations';
import UserNav from '../navs/userNav';
import { findErrorInErrorsArr } from '../commons/ErrorsHandling';

const Register = props => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState([]);

	const onChange = e => {
		if (errors) setErrors(errors.filter(error => error.path !== e.target.name));
		if (e.target.name === 'password') setPassword(e.target.value);
		if (e.target.name === 'email') setEmail(e.target.value);
	};

	const registerAndLoginUser = async (e, email, password, registerAndLogin) => {
		e.preventDefault();
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
	};

	return (
		<Fragment>
			<UserNav />
			<div className="container">
				<div className="row">
					<div className="col-md-6 mt-4 mx-auto">
						<h1 className="display-4 text-center">Register</h1>
						<p className="lead text-center">Create your eu-watcher account</p>
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
									/>
									<input type="submit" className="btn btn-info btn-block mt-4" />
								</form>
							)}
						</Mutation>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default withApollo(Register);
