import React, { Fragment, useContext, useState } from 'react';
import { Mutation } from 'react-apollo';
import { CommentContext, UserContext } from '../../contexts';
import { ADD_COMMENT } from '../../graphql/comment/Mutations';
import { GET_COMMENT_COMMENTS } from '../../graphql/comment/Queries';

const CommentReply = ({ hideForms }) => {
	const user = useContext(UserContext);
	const comment = useContext(CommentContext);
	const [text, setText] = useState('');

	const commentReply = (e, text, addComment) => {
		if (e.keyCode === 13) {
			e.preventDefault();
			addComment({
				variables: { user_ID: user.id, comment_ID: comment.id, text }
			}).then(res => {
				hideForms();
			});
		}
	};

	return (
		<Fragment>
			<Mutation
				mutation={ADD_COMMENT}
				refetchQueries={() => {
					return [{ query: GET_COMMENT_COMMENTS, variables: { comment_ID: comment.id } }];
				}}
			>
				{(addComment, e) => (
					<div className="input-group input-group-sm py-2">
						<input
							type="text"
							className="form-control rounded-pill"
							placeholder="Comment..."
							onChange={e => setText(e.target.value)}
							name="text"
							value={text}
							onKeyDown={e => commentReply(e, text, addComment)}
						/>
					</div>
				)}
			</Mutation>
		</Fragment>
	);
};

export default CommentReply;
