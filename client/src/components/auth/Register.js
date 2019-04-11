import React, { Fragment, useState } from 'react';
import { Mutation, withApollo } from 'react-apollo';
import { InputField } from '../commons/InputComponents';
import { REGISTER_AND_LOGIN_USER } from '../graphql/user/Mutations';

const Register = props => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState(!!'');

	const onChange = e => {
		if (errors) setErrors(!{});
		if (e.target.name === 'password') setPassword(e.target.value);
		if (e.target.name === 'email') setEmail(e.target.value);
	};

	const registerAndLoginUser = async (e, email, password, registerAndLogin) => {
		e.preventDefault();
		const response = await registerAndLogin({
			variables: { email, password }
		});
		const { success, token, errors } = response.data.registerAndLogin;
		if (!success) {
			setErrors(errors);
		}
		props.client.resetStore();
		await localStorage.setItem('token', token);
		props.history.push('/home/news');
	};

	return (
		<Fragment>
			<Mutation mutation={REGISTER_AND_LOGIN_USER}>
				{(registerAndLogin, e) => (
					<div className="row">
						<div className="col-md-6 mt-4 mx-auto">
							<h1 className="display-4 text-center">Register</h1>
							<p className="lead text-center">Create your eu-watcher account</p>
							<form onSubmit={e => registerAndLoginUser(e, email, password, registerAndLogin)}>
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
								<input type="submit" className="btn btn-info btn-block mt-4" />
								{errors ? (
									<div className="form-group mt-2 sm">
										<ul className="list-group list-group-flush" />
										{errors.map(error => (
											<li className="list-group-item list-group-item-danger" key={error.path}>
												<small>{error.message}</small>
											</li>
										))}
									</div>
								) : null}
							</form>
						</div>
					</div>
				)}
			</Mutation>
		</Fragment>
	);
};

export default withApollo(Register);
