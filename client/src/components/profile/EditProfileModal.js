import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { InputField, TextAreaField } from '../commons/InputComponents';
import { SuccessMsg, ErrorMsg } from '../commons/UserActionsComponents';

import { UPDATE_PROFILE } from '../graphql/profile/Mutations';

class EditProfileModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.profileId,
      name: this.props.name,
      position: this.props.position,
      organisation: this.props.organisation,
      twitter: this.props.twitter,
      linkedin: this.props.linkedin,
      interestOne: this.props.interestOne,
      interestTwo: this.props.interestTwo,
      interestThree: this.props.interestThree,
      bio: this.props.bio,
      updProfile: false,
      errors: !{}
    };
  }

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    if (this.state.errors) {
      this.setState({ errors: !{} });
    }
  };

  render() {
    const {
      _id,
      name,
      position,
      organisation,
      twitter,
      linkedin,
      interestOne,
      interestTwo,
      interestThree,
      bio,
      updProfile,
      errors
    } = this.state;
    return (
      <div
        className="modal fade"
        id="EditProfileModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="EditProfileModal"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content text-secondary  p-2">
            <div className="modal-header p-2 m-0">
              <h5 className="modal-title" id="EditProfileModal">
                Edit your Profile
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Mutation mutation={UPDATE_PROFILE}>
                {(updateProfile, e) => (
                  <form
                    onSubmit={async e => {
                      e.preventDefault();
                      const response = await updateProfile({
                        variables: {
                          _id,
                          name,
                          position,
                          organisation,
                          twitter,
                          linkedin,
                          interestOne,
                          interestTwo,
                          interestThree,
                          bio
                        }
                      });
                      console.log(response);
                      const { success, errors } = response.data.updateProfile;
                      if (errors) {
                        this.setState({
                          errors: errors
                        });
                      }
                      if (success) {
                        this.setState({ updProfile: true });
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
                    <TextAreaField
                      type="text"
                      placeholder="Your current position"
                      name="position"
                      value={position}
                      onChange={this.onChange}
                    />
                    <InputField
                      type="text"
                      placeholder="Your current organisation"
                      name="organisation"
                      value={organisation}
                      onChange={this.onChange}
                    />
                    <div className="form-row">
                      <div className="col">
                        {' '}
                        <InputField
                          type="text"
                          placeholder="First Interest"
                          name="interestOne"
                          value={interestOne}
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="col">
                        <InputField
                          type="text"
                          placeholder="Second Interest"
                          name="interestTwo"
                          value={interestTwo}
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="col">
                        {' '}
                        <InputField
                          type="text"
                          placeholder="Third Interest"
                          name="interestThree"
                          value={interestThree}
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                    <TextAreaField
                      type="text"
                      placeholder="A quick bio"
                      name="bio"
                      value={bio}
                      onChange={this.onChange}
                    />
                    <input
                      type="submit"
                      className="btn btn-info btn-block mt-4"
                    />
                    <br />
                    {updProfile ? (
                      <SuccessMsg msg="Your profile was successfully updated" />
                    ) : null}
                    {errors ? (
                      <div className="form-group mt-2 sm">
                        <ul className="list-group" />
                        {errors.map(error => (
                          <ErrorMsg path={error.path} message={error.message} />
                        ))}
                      </div>
                    ) : null}
                  </form>
                )}
              </Mutation>
            </div>
            <div className="modal-footer p-2 m-0">
              <Link to="#" className="btn btn-secondary" data-dismiss="modal">
                Close
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditProfileModal;
