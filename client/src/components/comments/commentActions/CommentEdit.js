import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { EDIT_COMMENT } from '../../graphql/comment/Mutations';
class CommentEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: this.props.text
		};
	}

	onChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	render() {
		const { comment_ID, refetch } = this.props;
		const { text } = this.state;
		return (
			<Fragment>
				<Mutation mutation={EDIT_COMMENT}>
					{(editComment, e) => (
						<div className="input-group input-group-sm py-2">
							<input
								type="text"
								className="form-control"
								placeholder="Edit your comment..."
								onChange={this.onChange}
								name="text"
								value={text}
							/>
							<div className="input-group-append">
								<Link
									to="#"
									className="btn bg-darkblue"
									onClick={e => {
										e.preventDefault();
										editComment({
											variables: { _id: comment_ID, text }
										}).then(res => {
											this.props.hideForms();
											refetch();
										});
									}}
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

export default CommentEdit;
