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

  setToken = async token => {
    this.props.client.resetStore();
    this.props.client.clearStore();
    await localStorage.setItem('jwtToken', token);
    const storedToken = await localStorage.getItem('jwtToken');
    if (storedToken) this.props.history.push('/dashboard');
  };

  render() {
    const { email, errors, password } = this.state;

    return (
      <Fragment>
        <Mutation mutation={LOGIN_USER}>
          {(login, e) => (
            <Fragment>
              <div className="container">
                <div className="row">
                  <div className="col-md-6 mt-4 mx-auto">
                    <h1 className="display-4 text-center">Login</h1>
                    <p className="lead text-center">
                      Login to your user account
                    </p>
                    <form
                      onSubmit={async e => {
                        e.preventDefault();
                        const response = await login({
                          variables: { email, password }
                        });
                        const { success, token, error } = response.data.login;
                        if (!success) {
                          this.setState({ errors: error });
                        } else {
                          this.setToken(token);
                        }
                      }}
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
                      {errors ? (
                        <div className="form-group">
                          <div className="alert alert-danger" role="alert">
                            {errors}
                          </div>
                        </div>
                      ) : null}
                      <input
                        type="submit"
                        className="btn btn-info btn-block mt-4"
                      />
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

export default withApollo(Login);
