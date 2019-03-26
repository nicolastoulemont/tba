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

	editComment = (e, comment_ID, text, editComment, refetch) => {
		if (
			(e.type === 'click' && e.target.className === 'fa fa-paper-plane text-white') ||
			(e.type === 'keydown' && e.keyCode === 13)
		) {
			e.preventDefault();
			editComment({
				variables: { _id: comment_ID, text }
			}).then(res => {
				this.props.hideForms();
				refetch();
			});
		}
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
								onKeyDown={e => this.editComment(e, comment_ID, text, editComment, refetch)}
							/>
							<div className="input-group-append">
								<Link
									to="#"
									className="btn bg-darkblue"
									onClick={e => this.editComment(e, comment_ID, text, editComment, refetch)}
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
