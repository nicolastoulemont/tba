import React, { Component, Fragment } from 'react';
import { Mutation, withApollo } from 'react-apollo';
import { InputField } from '../commons/InputComponents';
import { LOGIN_USER } from '../graphql/user/Mutations';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			errors: !!'',
			password: ''
		};
	}

	onChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
		if (this.state.errors) {
			this.setState({ errors: !{} });
		}
	};

	setToken = token => {
		this.props.client.resetStore();
		localStorage.setItem('token', token);
	};

	logIn = async (e, email, password, login) => {
		e.preventDefault();
		const response = await login({
			variables: { email, password }
		});
		const { success, token, error } = response.data.login;
		if (!success) {
			this.setState({ errors: error });
		} else {
			this.setToken(token);
			setTimeout(() => this.props.history.push('/home/news'), 50);
		}
	};

	render() {
		const { email, errors, password } = this.state;
		return (
			<Fragment>
				<Mutation mutation={LOGIN_USER}>
					{(login, e) => (
						<div className="row">
							<div className="col-md-6 mt-4 mx-auto">
								<h1 className="display-4 text-center">Login</h1>
								<p className="lead text-center">Login to your user account</p>
								<form onSubmit={async e => this.logIn(e, email, password, login)}>
									<InputField
										type="text"
										placeholder="Please enter your email adress"
										name="email"
										value={email}
										onChange={this.onChange}
									/>
									<InputField
										type="password"
										placeholder="Please enter your password"
										name="password"
										value={password}
										onChange={this.onChange}
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
							</div>
						</div>
					)}
				</Mutation>
			</Fragment>
		);
	}
}

export default withApollo(Login);
