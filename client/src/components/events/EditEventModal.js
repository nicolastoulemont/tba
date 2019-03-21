import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { InputField, TextAreaField, InputCheck } from '../commons/InputComponents';
import { SuccessMsg, ErrorMsg } from '../commons/UserActionsComponents';
import { UPDATE_EVENT } from '../graphql/event/Mutations';

class EditEventModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			_id: this.props.event_ID,
			eventCreator: this.props.eventCreator,
			loggedUser: this.props.loggedUser,
			name: this.props.name,
			ispublic: this.props.ispublic,
			categoryOne: this.props.categoryOne,
			categoryTwo: this.props.categoryTwo,
			categoryThree: this.props.categoryThree,
			start: this.props.start,
			end: this.props.end,
			description: this.props.description,
			location: this.props.location,
			updEvent: false,
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

	onCheck = e => {
		this.setState({ ispublic: !this.state.ispublic });
	};

	render() {
		const {
			_id,
			name,
			ispublic,
			categoryOne,
			categoryTwo,
			categoryThree,
			start,
			end,
			description,
			location,
			updEvent,
			errors
		} = this.state;
		const { refetch } = this.props;
		return (
			<div
				className="modal fade"
				id="EditEventModal"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="EditEventModal"
				aria-hidden="true"
			>
				<div className="modal-dialog" role="document">
					<div className="modal-content text-secondary p-2">
						<div className="modal-header p-2 m-0">
							<h5 className="modal-title ml-2" id="EditEventModal">
								Edit your Event
							</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<Mutation mutation={UPDATE_EVENT}>
								{(updateEvent, e) => (
									<form
										onSubmit={async e => {
											e.preventDefault();
											await updateEvent({
												variables: {
													_id,
													name,
													description,
													ispublic,
													categoryOne,
													categoryTwo,
													categoryThree,
													start,
													end,
													location
												}
											}).then(res => {
												const { success, errors } = res.data.updateEvent;
												if (errors) {
													this.setState({
														errors: errors
													});
												}
												if (success) {
													this.setState({ updEvent: true });
													refetch();
												}
											});
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
											name="ispublic"
											id="iseventpublic"
											value={ispublic}
											checked={ispublic}
											onChange={this.onCheck}
										/>
										<input type="submit" className="btn btn-info btn-block mt-4" />
										<br />
										{updEvent ? <SuccessMsg msg="Your event was successfully updated" /> : null}
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

export default EditEventModal;
