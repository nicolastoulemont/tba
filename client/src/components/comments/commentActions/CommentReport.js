import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { ADD_REPORT } from '../../graphql/report/Mutations';
class CommentReport extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: ''
		};
	}

	onChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	reportComment = (e, user, comment_ID, text, addReport) => {
		if (
			(e.type === 'click' && e.target.className === 'fa fa-paper-plane text-white') ||
			(e.type === 'keydown' && e.keyCode === 13)
		) {
			e.preventDefault();
			addReport({
				variables: { user_ID: user, text, comment_ID }
			}).then(res => {
				this.props.hideForms();
			});
		}
	};

	render() {
		const { comment_ID, user } = this.props;
		const { text } = this.state;
		return (
			<Fragment>
				<Mutation mutation={ADD_REPORT}>
					{(addReport, e) => (
						<div className="input-group input-group-sm py-2">
							<input
								type="text"
								className="form-control"
								placeholder="Report this comment"
								onChange={this.onChange}
								name="text"
								value={text}
								onKeyDown={e => this.reportComment(e, user, comment_ID, text, addReport)}
							/>
							<div className="input-group-append">
								<Link
									to="#"
									className="btn bg-darkblue"
									onClick={e => this.reportComment(e, user, comment_ID, text, addReport)}
								>
									<i className="fa fa-paper-plane text-white" aria-hidden="true" />
								</Link>
							</div>
						</div>
					)}
				</Mutation>
			</Fragment>
		);
	}
}

export default CommentReport;
