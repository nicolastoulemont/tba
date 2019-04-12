import React, { Fragment, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { EDIT_COMMENT } from '../../graphql/comment/Mutations';
import { GET_COMMENT_COMMENTS } from '../../graphql/comment/Queries';
import { CommentContext } from '../../contexts';

const CommentEdit = () => {
	const comment = useContext(CommentContext);
	const [text, setText] = useState('');

	const commentEdit = (e, text, editComment) => {
		if (
			(e.type === 'click' && e.target.className === 'fa fa-paper-plane text-white') ||
			(e.type === 'keydown' && e.keyCode === 13)
		) {
			e.preventDefault();
			editComment({
				variables: { _id: comment.id, text }
			}).then(res => {
				this.props.hideForms();
			});
		}
	};

	return (
		<Fragment>
			<Mutation
				mutation={EDIT_COMMENT}
				refetchQueries={() => {
					return [{ query: GET_COMMENT_COMMENTS, variables: { id: comment.id } }];
				}}
			>
				{(editComment, e) => (
					<div className="input-group input-group-sm py-2">
						<input
							type="text"
							className="form-control"
							placeholder="Edit your comment..."
							onChange={e => setText(e.target.value)}
							name="text"
							value={text}
							onKeyDown={e => commentEdit(e, text, editComment)}
						/>
						<div className="input-group-append">
							<Link
								to="#"
								className="btn bg-darkblue"
								onClick={e => commentEdit(e, text, editComment)}
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

export default CommentEdit;
