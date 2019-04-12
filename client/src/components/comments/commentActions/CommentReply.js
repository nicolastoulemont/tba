import React, { Fragment, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { ADD_COMMENT } from '../../graphql/comment/Mutations';
import { GET_COMMENT_COMMENTS } from '../../graphql/comment/Queries';
import { CommentContext, UserContext } from '../../contexts';

const CommentReply = () => {
	const user = useContext(UserContext);
	const comment = useContext(CommentContext);
	const [text, setText] = useState('');

	const commentReply = (e, text, addComment) => {
		if (
			(e.type === 'click' && e.target.className === 'fa fa-paper-plane text-white') ||
			(e.type === 'keydown' && e.keyCode === 13)
		) {
			e.preventDefault();
			addComment({
				variables: { user_ID: user.id, comment_ID: comment.id, text }
			}).then(res => {
				this.props.hideForms();
			});
		}
	};

	return (
		<Fragment>
			<Mutation
				mutation={ADD_COMMENT}
				refetchQueries={() => {
					return [{ query: GET_COMMENT_COMMENTS, variables: { id: comment.id } }];
				}}
			>
				{(addComment, e) => (
					<div className="input-group input-group-sm py-2">
						<input
							type="text"
							className="form-control"
							placeholder="Comment..."
							onChange={e => setText(e.target.value)}
							name="text"
							value={text}
							onKeyDown={e => commentReply(e, text, addComment)}
						/>
						<div className="input-group-append">
							<Link
								to="#"
								className="btn bg-darkblue"
								onClick={e => commentReply(e, text, addComment)}
							>
								<i className="fa fa-paper-plane text-white" aria-hidden="true" />
							</Link>
						</div>
					</div>
				)}
			</Mutation>
		</Fragment>
	);
};

export default CommentReply;
