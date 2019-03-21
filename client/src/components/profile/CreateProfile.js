import React, { Component, Fragment } from 'react';
import { Mutation, withApollo } from 'react-apollo';
import SideBar from '../sidebar/SideBar';
import { InputField } from '../commons/InputComponents';
import { CREATE_PROFILE } from '../graphql/profile/Mutations';
import { SuccessMsg, ErrorMsg } from '../commons/UserActionsComponents';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_ID: this.props.location.state.user,
      name: '',
      position: '',
      interests: '',
      success: false,
      error: {
        exist: false,
        msg: ''
      },
      userprofile: {
        exist: false,
        name: ''
      }
    };
  }

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      user_ID,
      name,
      position,
      interests,
      error,
      userprofile
    } = this.state;

    return (
      <Fragment>
        <div className="row">
          <SideBar user={user_ID} />
          <div className="col-md-9 ml-sm-auto col-lg-10 pt-3 px4">
            <div className="col-md-8 m-auto">
              <Mutation mutation={CREATE_PROFILE}>
                {(addProfile, e) => (
                  <div className="profile">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-8 m-auto">
                          <div className="row align-items-center">
                            <h6 className="display-4 text-center">
                              Create your profile
                            </h6>
                          </div>
                          <form
                            onSubmit={async e => {
                              e.preventDefault();
                              const response = await addProfile({
                                variables: { user_ID, name, position, interests }
                              });
                              const {
                                profile,
                                error
                              } = response.data.addProfile;
                              if (profile) {
                                this.setState({
                                  userprofile: {
                                    exist: true,
                                    name: profile.name
                                  }
                                });
                              } else {
                                this.setState({
                                  error: {
                                    exist: true,
                                    msg: error
                                  }
                                });
                              }
                            }}
                          >
                            <InputField
                              type="text"
                              placeholder="Name"
                              name="name"
                              value={name}
                              onChange={this.onChange}
                            />
                            <InputField
                              type="text"
                              placeholder="Position"
                              name="position"
                              value={position}
                              onChange={this.onChange}
                            />
                            <InputField
                              type="text"
                              placeholder="Interests"
                              name="interests"
                              value={interests}
                              onChange={this.onChange}
                            />
                            {userprofile.exist ? (
                              <SuccessMsg msg="Your profile has been successfully created" />
                            ) : null}
                            {error.exist ? <ErrorMsg msg={error.msg} /> : null}
                            <input
                              type="submit"
                              className="btn btn-info btn-block mt-4"
                            />
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Mutation>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withApollo(CreateProfile);
