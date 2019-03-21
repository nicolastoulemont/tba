import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { InputField, TextAreaField, InputCheck } from '../commons/InputComponents';
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
			isPublic: true,
			categoryOne: '',
			categoryTwo: '',
			categoryThree: '',
			location: '',
			start: '',
			end: '',
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
			isPublic: true,
			categoryOne: '',
			categoryTwo: '',
			categoryThree: '',
			location: '',
			start: '',
			end: '',
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
			isPublic,
			categoryOne,
			categoryTwo,
			categoryThree,
			location,
			start,
			end,
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
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							{/* <CQuery query={LOGGED_USER_ID}>
                {({ data }) => {
                  const user = data.currentUser;
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
                                  user_ID: user.id,
                                  name,
                                  description,
                                  isPublic,
                                  categoryOne,
                                  categoryTwo,
                                  categoryThree,
                                  location,
                                  start,
                                  end
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
                                  placeholder="Event Start :  YYYY-MM-DDTHH-MM"
                                  name="start"
                                  value={start}
                                  onChange={this.onChange}
                                />
                              </div>
                              <div className="col">
                                {' '}
                                <InputField
                                  type="text"
                                  placeholder=" Event End : YYYY-MM-DDTHH-MM"
                                  name="end"
                                  value={end}
                                  onChange={this.onChange}
                                />
                              </div>
                            </div>
                            <InputCheck
                              type="checkbox"
                              name="isPublic"
                              id="iseventpublic"
                              value={isPublic}
                              checked={isPublic}
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
              </CQuery> */}
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
