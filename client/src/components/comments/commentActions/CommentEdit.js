import React, { Fragment, useContext, useState } from 'react';
import { Mutation } from 'react-apollo';
import { CommentContext } from '../../contexts';
import { EDIT_COMMENT } from '../../graphql/comment/Mutations';
import { GET_COMMENT_COMMENTS } from '../../graphql/comment/Queries';

const CommentEdit = ({ hideForms }) => {
	const comment = useContext(CommentContext);
	const [text, setText] = useState('');

	const commentEdit = (e, text, editComment) => {
		if (e.keyCode === 13) {
			e.preventDefault();
			editComment({
				variables: { _id: comment.id, text }
			}).then(res => {
				hideForms();
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
							className="form-control rounded-pill"
							placeholder="Edit your comment..."
							onChange={e => setText(e.target.value)}
							name="text"
							value={text}
							onKeyDown={e => commentEdit(e, text, editComment)}
						/>
					</div>
				)}
			</Mutation>
		</Fragment>
	);
};

export default CommentEdit;
