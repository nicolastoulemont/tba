import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { TextAreaField } from '../commons/InputComponents';
import { SuccessMsg, ErrorMsg } from '../commons/UserActionsComponents';
import CQuery from '../commons/CustomQueryComponent';

import { ADD_REPORT } from '../graphql/report/Mutations';
import { LOGGED_USER_ID } from '../graphql/user/Queries';

class EventReportModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			newReport: false,
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
			text: '',
			newReport: true,
			errors: !{}
		});
	};

	render() {
		const { text, errors, newReport } = this.state;
		const { event_ID } = this.props;
		return (
			<div
				className="modal fade"
				id="EventReportModal"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="EventReportModal"
				aria-hidden="true"
			>
				<div className="modal-dialog pt-2" role="document">
					<div className="modal-content p-2">
						<div className="modal-header p-2 m-0">
							<h5 className="modal-title" id="EventReportModal">
								Report this event
							</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<CQuery query={LOGGED_USER_ID}>
								{({ data }) => {
									const user = data.currentUser;
									// Trigger the QUERY on every APP state changes...Maybe a passing the user as a prop would be a better idea
									return (
										<Fragment key={user.id}>
											<Mutation mutation={ADD_REPORT}>
												{(addReport, e) => (
													<form
														onSubmit={async e => {
															e.preventDefault();
															const response = await addReport({
																variables: {
																	user_ID: user.id,
																	text,
																	event_ID
																}
															});
															const { success, errors } = response.data.addReport;
															if (success) {
																this.setState({ newReport: true });
																this.resetState();
															}
															if (errors) {
																this.setState({
																	errors: errors
																});
															}
														}}
													>
														<TextAreaField
															type="text"
															placeholder="Write your report"
															name="text"
															value={text}
															onChange={this.onChange}
														/>
														<input type="submit" className="btn btn-info btn-block mt-4" />
														<br />
														{newReport ? <SuccessMsg msg="Your report was submitted" /> : null}
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

export default EventReportModal;
