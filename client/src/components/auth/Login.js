import React, { Fragment, useState } from 'react';
import { Mutation, withApollo } from 'react-apollo';
import { InputField } from '../commons/InputComponents';
import { LOGIN_USER } from '../graphql/user/Mutations';
import UserNav from '../navs/userNav';

const Login = props => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState(!!'');

	const onChange = e => {
		if (errors) setErrors(!{});
		if (e.target.name === 'password') setPassword(e.target.value);
		if (e.target.name === 'email') setEmail(e.target.value);
	};

	const logIn = async (e, email, password, login) => {
		e.preventDefault();
		const response = await login({
			variables: { email, password }
		});
		const { success, token, error } = response.data.login;
		if (!success) {
			setErrors(error);
		} else {
			props.client.resetStore();
			localStorage.setItem('token', token);
			setTimeout(() => props.history.push('/home/news'), 50);
		}
	};

	return (
		<Fragment>
			<UserNav />
			<div className="container">
				<div className="row">
					<div className="col-md-6 mt-4 mx-auto">
						<h1 className="display-4 text-center">Login</h1>
						<p className="lead text-center">Login to your user account</p>
						<Mutation mutation={LOGIN_USER}>
							{(login, e) => (
								<form onSubmit={e => logIn(e, email, password, login)}>
									<InputField
										type="text"
										placeholder="Please enter your email adress"
										name="email"
										value={email}
										onChange={onChange}
									/>
									<InputField
										type="password"
										placeholder="Please enter your password"
										name="password"
										value={password}
										onChange={onChange}
									/>
									{errors ? (
										<div className="form-group">
											<div className="alert alert-danger" role="alert">
												{errors}
											</div>
										</div>
									) : null}
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

export default withApollo(Login);
