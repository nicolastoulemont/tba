import React, { Component, Fragment } from 'react';
import { Mutation, withApollo } from 'react-apollo';
import { InputField } from '../commons/InputComponents';
import { REGISTER_AND_LOGIN_USER } from '../graphql/user/Mutations';

class Register extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			errors: !{},
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

	registerAndLoginUser = async (e, email, password, registerAndLogin) => {
		e.preventDefault();
		const response = await registerAndLogin({
			variables: { email, password }
		});
		console.log(response);
		const { success, token, errors } = response.data.registerAndLogin;
		if (!success) {
			this.setState({
				errors: errors
			});
		}
		this.props.client.resetStore();
		await localStorage.setItem('token', token);
		this.props.history.push('/home/news');
	};

	render() {
		const { email, errors, password } = this.state;
		return (
			<Fragment>
				<Mutation mutation={REGISTER_AND_LOGIN_USER}>
					{(registerAndLogin, e) => (
						<Fragment>
							<div className="container">
								<div className="row">
									<div className="col-md-6 mt-4 mx-auto">
										<h1 className="display-4 text-center">Register</h1>
										<p className="lead text-center">Create your eu-watcher account</p>
										<form
											onSubmit={async e =>
												this.registerAndLoginUser(e, email, password, registerAndLogin)
											}
										>
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
							</div>
						</Fragment>
					)}
				</Mutation>
			</Fragment>
		);
	}
}

export default withApollo(Register);
