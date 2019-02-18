import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import {
  InputField,
  TextAreaField,
  InputCheck
} from '../commons/InputComponents';
import { SuccessMsg, ErrorMsg } from '../commons/UserActionsComponents';
import CQuery from '../commons/CustomQueryComponent';

import { CREATE_EVENT } from '../graphql/event/Mutations';
import { LOGGED_USER_ID } from '../graphql/user/Queries';

class CreateEventModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      ispublic: true,
      categoryOne: '',
      categoryTwo: '',
      categoryThree: '',
      location: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      newEvent: false,
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

  resetState = () => {
    this.setState({
      name: '',
      description: '',
      ispublic: true,
      categoryOne: '',
      categoryTwo: '',
      categoryThree: '',
      location: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      newEvent: true,
      errors: !{}
    });
  };

  onCheck = e => {
    this.setState({ ispublic: !this.state.ispublic });
  };

  render() {
    const {
      name,
      description,
      ispublic,
      categoryOne,
      categoryTwo,
      categoryThree,
      location,
      startDate,
      startTime,
      endDate,
      endTime,
      errors,
      newEvent
    } = this.state;

    return (
      <div
        className="modal fade"
        id="CreateEventModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="CreateEventModal"
        aria-hidden="true"
      >
        <div className="modal-dialog pt-2" role="document">
          <div className="modal-content p-2">
            <div className="modal-header p-2 m-0">
              <h5 className="modal-title" id="CreateEventModal">
                Create an Event
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
              <CQuery query={LOGGED_USER_ID}>
                {({ data }) => {
                  const user = data.currentuser[0];
                  // Trigger the QUERY on every APP state changes...Maybe a passing the user as a prop would be a better idea
                  return (
                    <Fragment key={user.id}>
                      <Mutation mutation={CREATE_EVENT}>
                        {(addEvent, e) => (
                          <form
                            onSubmit={async e => {
                              e.preventDefault();
                              const response = await addEvent({
                                variables: {
                                  userId: user.id,
                                  name,
                                  description,
                                  ispublic,
                                  categoryOne,
                                  categoryTwo,
                                  categoryThree,
                                  location,
                                  startDate,
                                  startTime,
                                  endDate,
                                  endTime
                                }
                              });
                              const {
                                success,
                                errors
                              } = response.data.addEvent;
                              if (success) {
                                this.setState({ newEvent: true });
                                this.resetState();
                              }
                              if (errors) {
                                this.setState({
                                  errors: errors
                                });
                              }
                            }}
                          >
                            <InputField
                              type="text"
                              placeholder="Event Name"
                              name="name"
                              value={name}
                              onChange={this.onChange}
                            />
                            <TextAreaField
                              type="text"
                              placeholder="Event Description"
                              name="description"
                              value={description}
                              onChange={this.onChange}
                            />
                            <InputField
                              type="text"
                              placeholder="Event Location"
                              name="location"
                              value={location}
                              onChange={this.onChange}
                            />
                            <div className="form-row">
                              <div className="col">
                                {' '}
                                <InputField
                                  type="text"
                                  placeholder="First Category"
                                  name="categoryOne"
                                  value={categoryOne}
                                  onChange={this.onChange}
                                />
                              </div>
                              <div className="col">
                                <InputField
                                  type="text"
                                  placeholder="Second Category"
                                  name="categoryTwo"
                                  value={categoryTwo}
                                  onChange={this.onChange}
                                />
                              </div>
                              <div className="col">
                                {' '}
                                <InputField
                                  type="text"
                                  placeholder="Third Category"
                                  name="categoryThree"
                                  value={categoryThree}
                                  onChange={this.onChange}
                                />
                              </div>
                            </div>
                            <div className="form-row ">
                              <div className="col">
                                {' '}
                                <InputField
                                  type="text"
                                  placeholder="Start Date : YYYY-MM-DD"
                                  name="startDate"
                                  value={startDate}
                                  onChange={this.onChange}
                                />
                              </div>
                              <div className="col">
                                <InputField
                                  type="text"
                                  placeholder="Start Time: HH:MM"
                                  name="startTime"
                                  value={startTime}
                                  onChange={this.onChange}
                                />
                              </div>
                            </div>
                            <div className="form-row">
                              <div className="col">
                                {' '}
                                <InputField
                                  type="text"
                                  placeholder="End Date: YYYY-MM-DD"
                                  name="endDate"
                                  value={endDate}
                                  onChange={this.onChange}
                                />
                              </div>
                              <div className="col">
                                {' '}
                                <InputField
                                  type="text"
                                  placeholder="End Time: HH:MM"
                                  name="endTime"
                                  value={endTime}
                                  onChange={this.onChange}
                                />
                              </div>
                            </div>
                            <InputCheck
                              type="checkbox"
                              name="ispublic"
                              id="iseventpublic"
                              value={ispublic}
                              checked={ispublic}
                              onChange={this.onCheck}
                            />
                            <input
                              type="submit"
                              className="btn btn-info btn-block mt-4"
                            />
                            <br />
                            {newEvent ? (
                              <SuccessMsg msg="Your event was successfully created" />
                            ) : null}
                            {errors ? (
                              <div className="form-group mt-2 sm">
                                <ul className="list-group" />
                                {errors.map(error => (
                                  <ErrorMsg
                                    path={error.path}
                                    message={error.message}
                                  />
                                ))}
                              </div>
                            ) : null}
                          </form>
                        )}
                      </Mutation>
                    </Fragment>
                  );
                }}
              </CQuery>
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

export default CreateEventModal;
