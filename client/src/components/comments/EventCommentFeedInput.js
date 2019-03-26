import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { ADD_COMMENT } from '../graphql/comment/Mutations';
import { GET_EVENT_COMMENTS } from '../graphql/comment/Queries';

class EventCommentFeedInput extends Component {
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

	createComment = (e, user, event_ID, text, addComment) => {
		if (
			(e.type === 'click' && e.target.className === 'fa fa-paper-plane text-white') ||
			(e.type === 'keydown' && e.keyCode === 13)
		) {
			e.preventDefault();
			addComment({
				variables: { user_ID: user, event_ID, text }
			}).then(res => {
				this.setState({ text: '' });
			});
		}
	};

	render() {
		const { user, event_ID } = this.props;
		const { text } = this.state;
		return (
			<Fragment>
				<Mutation
					mutation={ADD_COMMENT}
					refetchQueries={() => {
						return [{ query: GET_EVENT_COMMENTS, variables: { id: event_ID } }];
					}}
				>
					{(addComment, e) => (
						<div className="input-group input-group-sm py-2 px-4">
							<input
								type="text"
								className="form-control mx-0"
								placeholder="Comment..."
								onChange={this.onChange}
								name="text"
								value={text}
								onKeyDown={e => this.createComment(e, user, event_ID, text, addComment)}
							/>
							<div className="input-group-append">
								<Link
									to="#"
									className="btn bg-darkblue"
									onClick={e => this.createComment(e, user, event_ID, text, addComment)}
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

export default EventCommentFeedInput;
